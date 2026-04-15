import { test, expect } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';

test.describe('My Roadmaps E2E', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/myroadmap');
    await expect(page.getByRole('heading', { name: '내 로드맵' })).toBeVisible({ timeout: 30000 });
  });

  test.describe('Page Layout', () => {
    test('renders header with title', async ({ page }) => {
      const heading = page.getByRole('heading', { name: '내 로드맵' });
      await expect(heading).toBeVisible();
    });

    test('renders sidebar with navigation items', async ({ page }) => {
      await expect(page.getByRole('button', { name: '최근' })).toBeVisible();
      await expect(page.getByRole('button', { name: '커뮤니티' })).toBeVisible();
      await expect(page.getByRole('button', { name: '내 로드맵' })).toBeVisible();
      await expect(page.getByRole('button', { name: '공유된 로드맵' })).toBeVisible();
      await expect(page.getByRole('button', { name: '즐겨찾기' })).toBeVisible();
    });

    test('renders toolbar with search, filter, and new button', async ({ page }) => {
      await expect(page.getByPlaceholder('로드맵 검색')).toBeVisible();
      await expect(page.getByLabel('Filter')).toBeVisible();
      await expect(page.getByRole('button', { name: /New/ })).toBeVisible();
    });

    test('renders sidebar profile info', async ({ page }) => {
      await expect(page.getByPlaceholder('Search')).toBeVisible();
    });
  });

  test.describe('Sidebar Navigation', () => {
    test('clicking sidebar category updates active state', async ({ page }) => {
      const communityButton = page.getByRole('button', { name: '커뮤니티' });
      await communityButton.click();
      await expect(communityButton).toHaveClass(/bg-slate-200/);
    });

    test('logout button is visible and clickable', async ({ page }) => {
      const logoutButton = page.getByRole('button', { name: '로그아웃' });
      await expect(logoutButton).toBeVisible();
    });
  });

  test.describe('Toolbar', () => {
    test('shows "내 전체 로드맵" as default breadcrumb', async ({ page }) => {
      await expect(page.getByText('내 전체 로드맵')).toBeVisible();
    });

    test('New dropdown shows roadmap and directory options', async ({ page }) => {
      await page.getByRole('button', { name: /New/ }).click();
      await expect(page.getByRole('menuitem', { name: '로드맵' })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: '디렉토리' })).toBeVisible();
    });

    test('clicking "로드맵" opens AddRoadmapModal', async ({ page }) => {
      await page.getByRole('button', { name: /New/ }).click();
      await page.getByRole('menuitem', { name: '로드맵' }).click();
      await expect(page.getByText('로드맵 추가')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('로드맵 이름을 입력하세요')).toBeVisible();
    });
  });

  test.describe('Roadmap Card Actions', () => {
    test('roadmap cards are displayed in grid', async ({ page }) => {
      const cards = page.locator('[role="article"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });
      const count = await cards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('card more menu shows action options', async ({ page }) => {
      const cards = page.locator('[role="article"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });

      const moreButton = cards.first().getByLabel('더 보기');
      await moreButton.click();

      await expect(page.getByRole('menuitem', { name: '즐겨찾기' })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: '이름수정' })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: '파일이동' })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
    });

    test('card rename opens dialog', async ({ page }) => {
      const cards = page.locator('[role="article"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });

      await cards.first().getByLabel('더 보기').click();
      await page.getByRole('menuitem', { name: '이름수정' }).click();

      await expect(page.getByText('이름 수정')).toBeVisible({ timeout: 5000 });
      await expect(page.getByPlaceholder('새 이름을 입력하세요')).toBeVisible();
    });

    test('card delete opens confirmation dialog', async ({ page }) => {
      const cards = page.locator('[role="article"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });

      await cards.first().getByLabel('더 보기').click();
      await page.getByRole('menuitem', { name: '삭제' }).click();

      await expect(page.getByText('정말 삭제하시겠습니까?')).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('이 작업은 되돌릴 수 없습니다.')).toBeVisible();
    });
  });

  test.describe('Directory Tree', () => {
    test('directory tree is rendered in sidebar', async ({ page }) => {
      await expect(page.getByText('프론트엔드', { exact: true })).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('백엔드', { exact: true })).toBeVisible();
    });

    test('directory has context menu with rename and delete', async ({ page }) => {
      await expect(page.getByText('프론트엔드', { exact: true })).toBeVisible({ timeout: 10000 });
      await page.getByLabel('프론트엔드 더보기').click();
      await expect(page.getByRole('menuitem', { name: '이름 변경' })).toBeVisible();
      await expect(page.getByRole('menuitem', { name: '삭제' })).toBeVisible();
    });
  });

  test.describe('Edge Cases', () => {
    test('search with no results shows empty grid', async ({ page }) => {
      const searchInput = page.getByPlaceholder('로드맵 검색');
      await searchInput.fill('존재하지않는로드맵이름xyz');
      await page
        .waitForSelector('[role="article"]', { state: 'detached', timeout: 5000 })
        .catch(() => {});

      const cards = page.locator('[role="article"]');
      await expect(cards).toHaveCount(0);
    });

    test('rename dialog confirm button disabled with empty input', async ({ page }) => {
      const cards = page.locator('[role="article"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });

      await cards.first().getByLabel('더 보기').click();
      await page.getByRole('menuitem', { name: '이름수정' }).click();

      await expect(page.getByText('이름 수정')).toBeVisible({ timeout: 5000 });
      const renameInput = page.getByPlaceholder('새 이름을 입력하세요');
      await renameInput.clear();

      const confirmButton = page.getByRole('button', { name: '확인' });
      await expect(confirmButton).toBeDisabled();
    });

    test('delete dialog cancel closes without deleting', async ({ page }) => {
      const cards = page.locator('[role="article"]');
      await expect(cards.first()).toBeVisible({ timeout: 10000 });
      const initialCount = await cards.count();

      await cards.first().getByLabel('더 보기').click();
      await page.getByRole('menuitem', { name: '삭제' }).click();

      await expect(page.getByText('정말 삭제하시겠습니까?')).toBeVisible({ timeout: 5000 });
      await page.getByRole('button', { name: '취소' }).click();

      // Dialog closed, cards still there
      await expect(page.getByText('정말 삭제하시겠습니까?')).not.toBeVisible();
      await expect(cards).toHaveCount(initialCount);
    });

    test('sidebar category switching resets active state', async ({ page }) => {
      const recentButton = page.getByRole('button', { name: '최근' });
      const communityButton = page.getByRole('button', { name: '커뮤니티' });

      await communityButton.click();
      await expect(communityButton).toHaveClass(/bg-slate-200/);

      await recentButton.click();
      await expect(recentButton).toHaveClass(/bg-slate-200/);
      // Community should no longer be active
      await expect(communityButton).not.toHaveClass(/bg-slate-200/);
    });

    test('logout redirects to login page', async ({ page }) => {
      await page.getByRole('button', { name: '로그아웃' }).click();
      await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
    });
  });
});
