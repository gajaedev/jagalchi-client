#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Capture EditorHeader screenshot
 */

import { chromium } from 'playwright';

async function captureHeader() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  console.log('📸 Navigating to editor...');
  await page.goto('http://localhost:3000/editor-test', { waitUntil: 'networkidle' });

  console.log('⏳ Waiting for header...');
  await page.waitForTimeout(2000);

  // Capture header
  const header = await page.locator('header').first();
  await header.screenshot({
    path: 'visual-tests/actual/EditorHeader-Current.png',
    animations: 'disabled',
  });

  console.log('✅ Header screenshot saved: visual-tests/actual/EditorHeader-Current.png');

  await browser.close();
}

captureHeader().catch(console.error);
