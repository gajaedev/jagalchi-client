import { expect, test } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';

/**
 * middleware.ts 가 보호 라우트에 대해 비인증 사용자를 /login 으로 리다이렉트하고
 * redirect query 에 원래 경로를 보존하는지 검증.
 */
test.describe('Protected routes', () => {
  const protectedPaths = ['/myroadmap', '/profile', '/editor/new'];

  for (const target of protectedPaths) {
    test(`비인증 상태로 ${target} 접근 시 /login 으로 리다이렉트하고 redirect 쿼리를 보존한다`, async ({
      page,
    }) => {
      await page.context().clearCookies();
      await page.goto(target);
      await expect(page).toHaveURL(new RegExp(`/login\\?redirect=${encodeURIComponent(target)}`), {
        timeout: 10000,
      });
    });
  }

  test('로그인 후 auth 페이지 접근 시 /myroadmap 으로 리다이렉트된다', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/login');
    await expect(page).toHaveURL(/\/myroadmap/, { timeout: 10000 });
  });

  test('로그인 → 보호 라우트 진입 → 로그아웃 전체 플로우', async ({ page }) => {
    // 1. 로그인
    await loginAsTestUser(page);
    await expect(page).toHaveURL(/\/myroadmap/, { timeout: 10000 });

    // 2. 보호 라우트 진입 확인
    await page.goto('/myroadmap');
    await expect(page.getByRole('heading', { name: '내 로드맵' })).toBeVisible({ timeout: 30000 });

    // 3. 로그아웃
    await page.getByRole('button', { name: '로그아웃' }).click();
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });

    // 4. 로그아웃 후 보호 라우트 접근 시 다시 /login 으로 리다이렉트
    await page.goto('/myroadmap');
    await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
  });
});
