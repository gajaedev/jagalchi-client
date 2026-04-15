import { test, expect } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';

test.describe('Home E2E', () => {
  test('home page redirects to /myroadmap', async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/');
    await expect(page).toHaveURL(/\/myroadmap/, { timeout: 10000 });
  });
});
