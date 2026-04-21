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
});
