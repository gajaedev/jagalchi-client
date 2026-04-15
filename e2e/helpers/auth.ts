import type { Page } from '@playwright/test';

const TEST_EMAIL = process.env.E2E_TEST_EMAIL ?? 'kim@example.com';
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD ?? 'Test1234!';

/**
 * MSW mock 계정으로 로그인 후 인증 상태 설정
 * 환경변수 E2E_TEST_EMAIL / E2E_TEST_PASSWORD 우선, 없으면 mock 기본값 사용
 */
export async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.getByPlaceholder('이메일 입력').fill(TEST_EMAIL);
  await page.getByPlaceholder('비밀번호 입력').fill(TEST_PASSWORD);
  await page.getByRole('button', { name: '로그인', exact: true }).click();
  await page.waitForURL(/\/(myroadmap)?$/, { timeout: 15000 });
}
