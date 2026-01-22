import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import { chromium } from 'playwright';

interface VisualTestConfig {
  url: string;
  name: string;
  figmaNodeId?: string;
  figmaFileKey?: string;
  viewport?: { width: number; height: number };
  selector?: string;
}

const SCREENSHOTS_DIR = join(process.cwd(), 'screenshots');

// 스크린샷 디렉토리 생성
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureScreenshot(config: VisualTestConfig) {
  console.log(`📸 Capturing: ${config.name}`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: config.viewport || { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  try {
    // 페이지 로드
    await page.goto(config.url, { waitUntil: 'networkidle' });

    // 특정 셀렉터가 있으면 대기
    if (config.selector) {
      await page.waitForSelector(config.selector, { timeout: 10000 });
    }

    // 스크린샷 촬영
    const screenshotPath = join(SCREENSHOTS_DIR, `${config.name}-actual.png`);

    if (config.selector) {
      // 특정 요소만 캡처
      const element = await page.locator(config.selector);
      await element.screenshot({ path: screenshotPath });
    } else {
      // 전체 페이지 캡처
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    console.log(`✅ Saved: ${screenshotPath}`);

    // Figma 정보가 있으면 출력
    if (config.figmaNodeId && config.figmaFileKey) {
      console.log(`🎨 Figma: nodeId=${config.figmaNodeId}, fileKey=${config.figmaFileKey}`);
    }
  } catch (error) {
    console.error(`❌ Error capturing ${config.name}:`, error);
  } finally {
    await browser.close();
  }
}

async function runVisualTests() {
  console.log('🚀 Starting visual tests...\n');

  const tests: VisualTestConfig[] = [
    {
      name: 'editor-full',
      url: 'http://localhost:3000/editor-test',
      viewport: { width: 1920, height: 1080 },
    },
    {
      name: 'editor-header',
      url: 'http://localhost:3000/editor-test',
      selector: 'header',
      viewport: { width: 1920, height: 1080 },
    },
    {
      name: 'editor-sidebar',
      url: 'http://localhost:3000/editor-test',
      selector: 'aside',
      viewport: { width: 1920, height: 1080 },
    },
    {
      name: 'editor-canvas',
      url: 'http://localhost:3000/editor-test',
      selector: '[data-testid="canvas"]',
      viewport: { width: 1920, height: 1080 },
    },
  ];

  for (const test of tests) {
    await captureScreenshot(test);
    console.log('');
  }

  console.log('✨ All visual tests completed!');
  console.log(`📁 Screenshots saved to: ${SCREENSHOTS_DIR}`);
}

// 메인 실행
runVisualTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
