import { test } from '@playwright/test';

import { loginAsTestUser } from './helpers/auth';
import { assertNoA11yViolations } from './helpers/a11y';

test.describe('A11y smoke', () => {
  test('login page has no serious/critical violations', async ({ page }, testInfo) => {
    await page.goto('/login');
    await assertNoA11yViolations(page, testInfo, { label: 'login' });
  });

  test('register page has no serious/critical violations', async ({ page }, testInfo) => {
    await page.goto('/register');
    await assertNoA11yViolations(page, testInfo, { label: 'register' });
  });

  test('community list has no serious/critical violations', async ({ page }, testInfo) => {
    await page.goto('/community');
    await assertNoA11yViolations(page, testInfo, { label: 'community' });
  });

  test('my roadmaps has no serious/critical violations', async ({ page }, testInfo) => {
    await loginAsTestUser(page);
    await page.goto('/myroadmap');
    await assertNoA11yViolations(page, testInfo, { label: 'myroadmap' });
  });
});
