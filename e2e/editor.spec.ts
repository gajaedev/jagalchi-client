import { test, expect } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';

// MSW fixture에 있는 로드맵 ID 사용
const TEST_ROADMAP_ID = '1';

// 에디터는 localStorage에서 로드맵을 읽으므로 beforeEach에서 시딩 필요
const EDITOR_SEED_ROADMAP = {
  id: 1,
  title: '프론트엔드 개발자 로드맵',
  nodes: [
    {
      id: 'node-1',
      type: 'jagalchi-node',
      position: { x: 250, y: 0 },
      data: { label: 'HTML/CSS 기초', variant: 'blue', isLocked: false },
    },
    {
      id: 'node-2',
      type: 'jagalchi-node',
      position: { x: 250, y: 150 },
      data: { label: 'JavaScript', variant: 'orange', isLocked: false },
    },
  ],
  edges: [{ id: 'edge-1-2', source: 'node-1', target: 'node-2' }],
  isPublic: true,
  createdAt: '2025-07-01T10:00:00.000Z',
  updatedAt: '2025-12-15T14:30:00.000Z',
};

test.describe('Editor E2E', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
    // 에디터는 localStorage fallback을 사용하므로 로그인 후 시딩
    await page.evaluate((roadmap) => {
      localStorage.setItem('jagalchi-roadmaps', JSON.stringify([roadmap]));
    }, EDITOR_SEED_ROADMAP);
    await page.goto(`/editor/${TEST_ROADMAP_ID}`);
  });

  test('editor page loads and canvas renders', async ({ page }) => {
    await page.waitForSelector('.react-flow', { timeout: 30000 });
    const canvas = page.locator('.react-flow');
    await expect(canvas).toBeVisible();
  });

  test('node can be added via toolbar', async ({ page }) => {
    await page.waitForSelector('.react-flow', { timeout: 30000 });
    const initialNodes = await page.locator('.react-flow__node').count();
    await page.getByTestId('toolbar-add-node').click();
    await expect(page.locator('.react-flow__node')).toHaveCount(initialNodes + 1);
  });

  test.fixme('node selection shows properties panel', async ({ page }) => {
    await page.waitForSelector('.react-flow', { timeout: 30000 });
    const nodes = page.locator('.react-flow__node');
    const initialCount = await nodes.count();

    // Add a new node
    await page.getByTestId('toolbar-add-node').click();
    await expect(nodes).toHaveCount(initialCount + 1, { timeout: 5000 });

    // Click the last added node via bounding box
    const lastNode = nodes.nth(initialCount);
    await lastNode.waitFor({ state: 'visible', timeout: 5000 });
    const box = await lastNode.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
    await expect(page.getByTestId('properties-panel-header')).toBeVisible({ timeout: 10000 });
  });

  // Ctrl+Z undo는 unit test (use-keyboard-shortcuts.test.ts)에서 커버.
  // headless Chromium에서 React Flow 키보드 이벤트가 동작하지 않아 E2E 제외.
});
