#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Figma Snapshot Script
 *
 * Creates a 3-panel comparison image: Figma | Diff | Actual
 * Used by the /figma-check skill.
 *
 * Args:
 *   --file-key   Figma file key
 *   --node-id    Figma node ID (e.g. "312:628")
 *   --story-id   Storybook story ID (optional)
 *   --name       Component name for output filename
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import * as fs from 'node:fs/promises';

// Load .env.local (tsx doesn't auto-load it unlike Next.js)
try {
  const envContent = readFileSync('.env.local', 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed
      .slice(eqIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (key && !(key in process.env)) process.env[key] = value;
  }
} catch {
  /* .env.local 없으면 스킵 */
}

import pixelmatch from 'pixelmatch';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import sharp from 'sharp';

const args = process.argv.slice(2);

function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : undefined;
}

const fileKey = getArg('file-key');
const nodeId = getArg('node-id');
const storyId = getArg('story-id');
const name = getArg('name') ?? 'component';

const SEP = 4;
const SEP_COLOR = { r: 200, g: 200, b: 200 };

interface FigmaImageResponse {
  err: string | null;
  images: Record<string, string>;
}

async function downloadFigmaScreenshot(): Promise<Buffer | null> {
  const token = process.env.FIGMA_ACCESS_TOKEN;

  if (!token || !fileKey || !nodeId) {
    console.log('⚠️  FIGMA_ACCESS_TOKEN 없음 — Figma 스크린샷 스킵');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=1`,
      { headers: { 'X-Figma-Token': token } },
    );

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const data = (await response.json()) as FigmaImageResponse;
    if (data.err) throw new Error(data.err);

    const imageUrl = data.images[nodeId];
    if (!imageUrl) throw new Error('No image URL returned');

    const imgResponse = await fetch(imageUrl);
    if (!imgResponse.ok) throw new Error(`Download failed: ${imgResponse.status}`);

    const buffer = Buffer.from(await imgResponse.arrayBuffer());
    console.log('✓ Figma 스크린샷 다운로드 완료');
    return buffer;
  } catch (error) {
    console.log(`⚠️  Figma 스크린샷 실패 (${error}) — 스킵`);
    return null;
  }
}

async function captureStorybookScreenshot(figmaDimension?: {
  width: number;
  height: number;
}): Promise<Buffer | null> {
  if (!storyId) {
    console.log('⚠️  story-id 없음 — 실제 스크린샷 스킵');
    return null;
  }

  try {
    const res = await fetch('http://localhost:6006');
    if (!res.ok) throw new Error();
  } catch {
    console.log('⚠️  Storybook이 :6006에서 실행 중이 아님 — 스킵');
    return null;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const vpWidth = figmaDimension ? Math.max(320, figmaDimension.width) : 1280;
  const vpHeight = figmaDimension ? Math.max(600, figmaDimension.height) : 900;
  await page.setViewportSize({ width: vpWidth, height: vpHeight });

  try {
    const url = `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const target = page.locator('[data-story-capture-root]').first();
    const box = await target.boundingBox().catch(() => null);

    let buffer: Buffer;
    if (box && box.width > 0 && box.height > 0) {
      buffer = await target.screenshot({ animations: 'disabled', omitBackground: true });
    } else {
      buffer = await page.screenshot({ animations: 'disabled' });
    }

    console.log('✓ 실제 스크린샷 캡처 완료');
    return buffer;
  } finally {
    await browser.close();
  }
}

async function normalizeToSize(input: Buffer, width: number, height: number): Promise<Buffer> {
  const meta = await sharp(input).metadata();
  const cropW = Math.min(meta.width ?? width, width);
  const cropH = Math.min(meta.height ?? height, height);

  return sharp(input)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .extract({ left: 0, top: 0, width: cropW, height: cropH })
    .extend({
      right: Math.max(0, width - cropW),
      bottom: Math.max(0, height - cropH),
      background: { r: 255, g: 255, b: 255 },
    })
    .toBuffer();
}

async function buildDiffBuffer(
  figmaNorm: Buffer,
  actualNorm: Buffer,
  width: number,
  height: number,
): Promise<{ diffBuffer: Buffer; diffPercent: number }> {
  const figmaPng = PNG.sync.read(figmaNorm);
  const actualPng = PNG.sync.read(actualNorm);
  const diff = new PNG({ width, height });

  const diffPixels = pixelmatch(figmaPng.data, actualPng.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });

  const diffPercent = Math.round((diffPixels / (width * height)) * 10000) / 100;
  const diffBuffer = PNG.sync.write(diff);

  return { diffBuffer: Buffer.from(diffBuffer), diffPercent };
}

async function createComparison(figma: Buffer | null, actual: Buffer | null): Promise<void> {
  if (!figma && !actual) {
    console.log('❌ 스크린샷 없음 — 종료');
    process.exit(1);
  }

  const outputPath = `/tmp/figma-check-${name}.png`;

  // 한쪽만 있는 경우
  if (figma && !actual) {
    await fs.writeFile(outputPath, figma);
    console.log(`\n📸 Figma만 저장 (실제 스크린샷 없음): ${outputPath}`);
    execSync(`open "${outputPath}"`);
    return;
  }
  if (!figma && actual) {
    await fs.writeFile(outputPath, actual);
    console.log(`\n📸 실제 구현만 저장 (Figma 없음): ${outputPath}`);
    execSync(`open "${outputPath}"`);
    return;
  }

  // 3패널: Figma | Diff | Actual
  const figmaMeta = await sharp(figma!).metadata();
  const actualMeta = await sharp(actual!).metadata();

  const W = Math.max(figmaMeta.width ?? 400, actualMeta.width ?? 400);
  const H = Math.max(figmaMeta.height ?? 600, actualMeta.height ?? 600);

  console.log(`\n📐 정규화 크기: ${W}×${H}`);

  const [figmaNorm, actualNorm] = await Promise.all([
    normalizeToSize(figma!, W, H),
    normalizeToSize(actual!, W, H),
  ]);

  const { diffBuffer, diffPercent } = await buildDiffBuffer(figmaNorm, actualNorm, W, H);

  const totalWidth = W * 3 + SEP * 2;

  await sharp({
    create: { width: totalWidth, height: H, channels: 3, background: SEP_COLOR },
  })
    .composite([
      { input: figmaNorm, left: 0, top: 0 },
      { input: diffBuffer, left: W + SEP, top: 0 },
      { input: actualNorm, left: W * 2 + SEP * 2, top: 0 },
    ])
    .toFile(outputPath);

  console.log(`\n📸 비교 이미지 저장: ${outputPath}`);
  console.log(`   왼쪽: Figma 디자인`);
  console.log(`   가운데: 차이 (빨간 픽셀 = 다른 부분)`);
  console.log(`   오른쪽: 실제 구현`);
  console.log(`   차이: ${diffPercent}%`);

  try {
    execSync(`open "${outputPath}"`);
  } catch {
    console.log(`\n열기: open "${outputPath}"`);
  }
}

async function main() {
  console.log(`\n🔍 시각적 비교 생성 중: ${name}\n`);

  const figma = await downloadFigmaScreenshot();

  const figmaMeta = figma ? await sharp(figma).metadata() : undefined;
  const figmaDimension =
    figmaMeta?.width && figmaMeta.height
      ? { width: figmaMeta.width, height: figmaMeta.height }
      : undefined;

  const actual = await captureStorybookScreenshot(figmaDimension);

  await createComparison(figma, actual);
}

main().catch((error) => {
  console.error('❌ 실패:', error);
  process.exit(1);
});
