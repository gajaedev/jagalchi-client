import { test, expect } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';

test.describe('Community E2E', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test.describe('Community List Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/community');
      // Wait for the grid to render with roadmap cards
      await page.waitForSelector('a[href^="/community/"]', { timeout: 30000 });
    });

    test('community page loads and shows roadmap list', async ({ page }) => {
      const cards = page.locator('a[href^="/community/"]');
      await expect(cards.first()).toBeVisible();

      const count = await cards.count();
      expect(count).toBeGreaterThan(0);

      const firstCardTitle = cards.first().locator('p').first();
      await expect(firstCardTitle).toBeVisible();
      await expect(firstCardTitle).not.toHaveText('');
    });

    test('filter and sort controls are visible', async ({ page }) => {
      await expect(page.getByText('인기')).toBeVisible();
      await expect(page.getByText('최신')).toBeVisible();
      await expect(page.getByText('저장된 로드맵')).toBeVisible();
      await expect(page.getByText('내림차순')).toBeVisible();
    });

    test('roadmap card click navigates to detail page', async ({ page }) => {
      const firstCard = page.locator('a[href^="/community/"]').first();
      const href = await firstCard.getAttribute('href');
      await firstCard.click();

      await page.waitForURL(`**${href}`, { timeout: 30000 });
      expect(page.url()).toContain('/community/');
    });
  });

  test.describe('Community Detail Page', () => {
    test.beforeEach(async ({ page }) => {
      // MSW fixture: id=1
      await page.goto('/community/1');
      await page.waitForSelector('h1', { timeout: 30000 });
    });

    test('community detail page renders roadmap info', async ({ page }) => {
      const title = page.locator('h1');
      await expect(title).toBeVisible();
      await expect(title).not.toHaveText('');

      await expect(page.getByText('로드맵 보기')).toBeVisible();
      await expect(page.getByText('내 로드맵에 추가')).toBeVisible();
      await expect(page.getByText('About')).toBeVisible();
      await expect(page.getByText('Made by')).toBeVisible();
    });

    test('fork button shows success message after click', async ({ page }) => {
      const forkButton = page.getByRole('button', { name: '내 로드맵에 추가' });
      await expect(forkButton).toBeVisible();
      await forkButton.click();

      // MSW에서 fork API 성공 → 인라인 성공 메시지 표시
      await expect(page.getByText('로드맵을 내 로드맵에 추가했습니다.')).toBeVisible({
        timeout: 10000,
      });
    });

    test('view roadmap button navigates to viewer', async ({ page }) => {
      await page.getByText('로드맵 보기').click();
      await expect(page).toHaveURL(/\/viewer\/1/, { timeout: 10000 });
    });
  });

  test.describe('Edge Cases', () => {
    test('tab switching between 인기 and 최신 loads content', async ({ page }) => {
      await page.goto('/community');
      await page.waitForSelector('a[href^="/community/"]', { timeout: 30000 });

      // Switch to 최신 — cards should still render
      await page.getByText('최신').click();
      const cards = page.locator('a[href^="/community/"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });
    });

    test('저장된 로드맵 tab shows empty state', async ({ page }) => {
      await page.goto('/community');
      await page.waitForSelector('a[href^="/community/"]', { timeout: 30000 });

      await page.getByText('저장된 로드맵').click();
      // Should show empty state for saved roadmaps
      await expect(page.getByText('저장된 로드맵이 없습니다.')).toBeVisible({ timeout: 5000 });
    });

    test('community detail for non-existent roadmap shows error', async ({ page }) => {
      await page.goto('/community/99999');
      await expect(page.getByText('로드맵을 찾을 수 없습니다')).toBeVisible({ timeout: 30000 });
    });

    test('community detail has back button', async ({ page }) => {
      await page.goto('/community/1');
      await page.waitForSelector('h1', { timeout: 30000 });
      await expect(page.getByLabel('뒤로가기')).toBeVisible();
    });
  });
});
