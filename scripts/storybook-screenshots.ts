#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
/**
 * Storybook Screenshots Script
 *
 * Captures screenshots of Storybook stories using Playwright.
 * Requires Storybook to be running on http://localhost:6006
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { chromium } from 'playwright';

/**
 * Stories to capture (matching Figma components)
 */
const STORIES_TO_CAPTURE = [
  // Property Panels
  'features-roadmapeditor-organisms-nodepropertiespanel--default',
  'features-roadmapeditor-organisms-edgepropertiespanel--default',
  'features-roadmapeditor-organisms-sectionpropertiespanel--default',
  'features-roadmapeditor-organisms-textpropertiespanel--default',

  // Interactive Components
  'editor-atoms-toolbarbutton--select',

  // AI Features
  'organisms-roadmapaimodal--generate-mode',
];

function storyIdToFileName(storyId: string): string {
  // Convert story ID to PascalCase filename
  // e.g., "roadmap-editor-organisms-nodepropertiespanel--default" -> "NodePropertiesPanel-Default"
  const parts = storyId.split('--');
  const variant = parts[1]
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const componentParts = parts[0]?.split('-');
  const component = componentParts
    ?.slice(-1)[0]
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return `${component}-${variant}`;
}

async function captureStoryScreenshot(
  page: any,
  storyId: string,
  outputPath: string,
): Promise<void> {
  const url = `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`;

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for story to render
    await page.waitForTimeout(1000);

    // Get the story container
    const storyElement = await page.locator('#storybook-root > *').first();

    if (!(await storyElement.isVisible())) {
      throw new Error('Story element not visible');
    }

    // Take screenshot
    await storyElement.screenshot({
      path: outputPath,
      animations: 'disabled',
    });

    console.log(`✓ Captured: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Failed to capture ${storyId}:`, error);
    throw error;
  }
}

async function main() {
  const outputDir = path.join(process.cwd(), 'visual-tests/actual');

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  console.log('📸 Capturing Storybook screenshots...\n');
  console.log('⚠️  Make sure Storybook is running on http://localhost:6006\n');

  // Launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });

  let captured = 0;
  let failed = 0;

  for (const storyId of STORIES_TO_CAPTURE) {
    try {
      const fileName = storyIdToFileName(storyId);
      const outputPath = path.join(outputDir, `${fileName}.png`);

      await captureStoryScreenshot(page, storyId, outputPath);
      captured++;
    } catch {
      console.error(`Failed to capture ${storyId}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n✅ Captured ${captured} screenshots`);
  if (failed > 0) {
    console.log(`❌ Failed ${failed} screenshots`);
    process.exit(1);
  }
}

// Check if Storybook is running
async function checkStorybookRunning(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:6006');
    return response.ok;
  } catch {
    return false;
  }
}

checkStorybookRunning().then(async (isRunning) => {
  if (!isRunning) {
    console.error('❌ Storybook is not running on http://localhost:6006');
    console.log('\nStart Storybook first:');
    console.log('  pnpm storybook');
    process.exit(1);
  }

  await main().catch((error) => {
    console.error('❌ Screenshot capture failed:', error);
    process.exit(1);
  });
});
