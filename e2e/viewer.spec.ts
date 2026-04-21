import { test, expect } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';

// Viewer는 NEXT_PUBLIC_REALTIME_ENABLED=true일 때 API, 아닐 때 localStorage 사용.
// 현재 dev 환경에서는 localStorage fallback이므로 별도 seeding 필요.
test.describe('Viewer E2E', () => {
  test('viewer page loads with seeded localStorage data', async ({ page }) => {
    await loginAsTestUser(page);

    await page.evaluate(() => {
      const roadmap = {
        id: 1,
        title: 'Viewer Test',
        nodes: [
          {
            id: 'n1',
            type: 'jagalchi-node',
            position: { x: 100, y: 100 },
            data: { label: 'Test', variant: 'blue', isLocked: false },
          },
        ],
        edges: [],
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('jagalchi-roadmaps-v1', JSON.stringify([roadmap]));
    });

    await page.goto('/viewer/1');

    const header = page.locator('header');
    await expect(header).toBeVisible({ timeout: 15000 });
  });
});
