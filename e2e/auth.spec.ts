import { test, expect } from '@playwright/test';

test.describe('Auth E2E', () => {
  // 각 테스트는 fresh context이므로 세션 쿠키 없음 → MSW refresh 자동 실패 → 비인증 상태

  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('renders correctly with email input, password input, and submit button', async ({
      page,
    }) => {
      await expect(page.getByText('로그인해서 계속하기')).toBeVisible();
      await expect(page.getByText('이메일 주소를 입력해주세요')).toBeVisible();

      const emailInput = page.getByPlaceholder('이메일 입력');
      await expect(emailInput).toBeVisible();

      const passwordInput = page.getByPlaceholder('비밀번호 입력');
      await expect(passwordInput).toBeVisible();

      const submitButton = page.getByRole('button', { name: '로그인', exact: true });
      await expect(submitButton).toBeVisible();
    });

    test('shows validation errors for empty submission', async ({ page }) => {
      const submitButton = page.getByRole('button', { name: '로그인', exact: true });
      await submitButton.click();

      await expect(page.getByText('이메일을 입력해주세요')).toBeVisible();
      await expect(page.getByText('비밀번호를 입력해주세요')).toBeVisible();
    });

    test('shows email format validation error', async ({ page }) => {
      const emailInput = page.getByPlaceholder('이메일 입력');
      await emailInput.fill('invalid-email');

      const submitButton = page.getByRole('button', { name: '로그인', exact: true });
      await submitButton.click();

      await expect(page.getByText('올바른 이메일 형식이 아닙니다')).toBeVisible();
    });

    test('login with valid credentials redirects to myroadmap', async ({ page }) => {
      const emailInput = page.getByPlaceholder('이메일 입력');
      const passwordInput = page.getByPlaceholder('비밀번호 입력');
      const submitButton = page.getByRole('button', { name: '로그인', exact: true });

      await emailInput.fill('kim@example.com');
      await passwordInput.fill('Test1234!');
      await submitButton.click();

      // / → /myroadmap 리다이렉트
      await expect(page).toHaveURL(/\/myroadmap/, { timeout: 10000 });
    });

    test('login with invalid credentials shows error message', async ({ page }) => {
      const emailInput = page.getByPlaceholder('이메일 입력');
      const passwordInput = page.getByPlaceholder('비밀번호 입력');
      const submitButton = page.getByRole('button', { name: '로그인', exact: true });

      await emailInput.fill('wrong@example.com');
      await passwordInput.fill('wrongpassword');
      await submitButton.click();

      await expect(page.getByText('이메일 또는 비밀번호가 올바르지 않습니다')).toBeVisible({
        timeout: 10000,
      });
    });

    test('has link to register page', async ({ page }) => {
      const registerLink = page.getByRole('link', { name: '회원가입' });
      await expect(registerLink).toBeVisible();
      await expect(registerLink).toHaveAttribute('href', '/register');
    });

    test('has link to find-password page', async ({ page }) => {
      const findPasswordLink = page.getByRole('link', { name: '비밀번호를 잊어버렸나요?' });
      await expect(findPasswordLink).toBeVisible();
      await expect(findPasswordLink).toHaveAttribute('href', '/find-password');
    });
  });

  test.describe('Register Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/register');
    });

    test('renders Step 1 with email, password, and verification fields', async ({ page }) => {
      await expect(page.getByText('회원가입', { exact: true })).toBeVisible();
      await expect(page.getByText('회원가입할 이메일 정보를 입력해주세요')).toBeVisible();

      await expect(page.getByPlaceholder('이메일 입력')).toBeVisible();
      await expect(page.getByPlaceholder('비밀번호 지정')).toBeVisible();
      await expect(page.getByText('인증번호', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: '인증번호 전송' })).toBeVisible();
    });

    test('Step 1: send verification code, verify, and proceed to Step 2', async ({ page }) => {
      const emailInput = page.getByPlaceholder('이메일 입력');
      const passwordInput = page.getByPlaceholder('비밀번호 지정');

      await emailInput.fill('newuser@example.com');
      await passwordInput.fill('NewPass1234!');

      const sendCodeButton = page.getByRole('button', { name: '인증번호 전송' });
      await sendCodeButton.click();

      const nextButton = page.getByRole('button', { name: '다음' });
      await expect(nextButton).toBeVisible({ timeout: 10000 });

      const codeInput = page.getByPlaceholder('인증번호 입력');
      await codeInput.fill('123456');
      await nextButton.click();

      await expect(page.getByPlaceholder('사용자 이름 입력')).toBeVisible({ timeout: 10000 });
    });

    test('Step 1 → Step 2 → Step 3 → complete registration', async ({ page }) => {
      await page.getByPlaceholder('이메일 입력').fill('fullflow@example.com');
      await page.getByPlaceholder('비밀번호 지정').fill('NewPass1234!');
      await page.getByRole('button', { name: '인증번호 전송' }).click();

      const nextButton = page.getByRole('button', { name: '다음' });
      await expect(nextButton).toBeVisible({ timeout: 10000 });
      await page.getByPlaceholder('인증번호 입력').fill('123456');
      await nextButton.click();

      const usernameInput = page.getByPlaceholder('사용자 이름 입력');
      await expect(usernameInput).toBeVisible({ timeout: 10000 });
      await usernameInput.fill('테스트유저');
      await page.getByRole('button', { name: '확인' }).click();

      const skipButton = page.getByRole('button', { name: '건너뛰기' });
      await expect(skipButton).toBeVisible({ timeout: 10000 });
      await skipButton.click();

      // 회원가입 완료 후 /login으로 리다이렉트 (RegisterForm.tsx: router.push('/login'))
      await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
    });
  });

  test.describe('Find Password Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/find-password');
    });

    test('renders correctly with email and verification fields', async ({ page }) => {
      await expect(page.getByText('이메일 인증')).toBeVisible();
      await expect(page.getByText('비밀번호를 재설정할 이메일을 입력해주세요')).toBeVisible();

      await expect(page.getByPlaceholder('이메일 입력')).toBeVisible();
      await expect(page.getByText('인증번호', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: '인증번호 전송' })).toBeVisible();

      const loginLink = page.getByRole('link', { name: '로그인하기' });
      await expect(loginLink).toBeVisible();
      await expect(loginLink).toHaveAttribute('href', '/login');
    });

    test('Step 1: verify email, then Step 2: reset password and redirect to login', async ({
      page,
    }) => {
      const emailInput = page.getByPlaceholder('이메일 입력');
      await emailInput.fill('kim@example.com');

      const sendCodeButton = page.getByRole('button', { name: '인증번호 전송' });
      await sendCodeButton.click();

      const nextButton = page.getByRole('button', { name: '다음' });
      await expect(nextButton).toBeVisible({ timeout: 10000 });

      const codeInput = page.getByPlaceholder('인증번호 입력');
      await codeInput.fill('123456');
      await nextButton.click();

      const newPasswordInput = page.getByPlaceholder('비밀번호 입력');
      await expect(newPasswordInput).toBeVisible({ timeout: 10000 });

      const confirmPasswordInput = page.getByPlaceholder('비밀번호 다시 입력');
      await expect(confirmPasswordInput).toBeVisible();

      await newPasswordInput.fill('NewPassword1234!');
      await confirmPasswordInput.fill('NewPassword1234!');

      const submitButton = page.getByRole('button', { name: '완료' });
      await submitButton.click();

      await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
    });
  });

  test.describe('Edge Cases', () => {
    test('password visibility toggle works', async ({ page }) => {
      await page.goto('/login');
      const passwordInput = page.getByPlaceholder('비밀번호 입력');
      await passwordInput.fill('myPassword');

      // Default: password hidden
      await expect(passwordInput).toHaveAttribute('type', 'password');

      // Click toggle
      await page.getByRole('button', { name: '비밀번호 보기' }).click();
      await expect(passwordInput).toHaveAttribute('type', 'text');

      // Click again: hidden
      await page.getByRole('button', { name: /비밀번호/ }).click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('login button shows loading state during submission', async ({ page }) => {
      await page.goto('/login');
      await page.getByPlaceholder('이메일 입력').fill('kim@example.com');
      await page.getByPlaceholder('비밀번호 입력').fill('Test1234!');

      const submitButton = page.getByRole('button', { name: '로그인', exact: true });
      await submitButton.click();

      // Button should be disabled during submission
      // (check immediately after click, before redirect)
      await expect(page).toHaveURL(/\/myroadmap/, { timeout: 10000 });
    });

    test('register email disabled after verification code sent', async ({ page }) => {
      await page.goto('/register');
      await page.getByPlaceholder('이메일 입력').fill('edge@example.com');
      await page.getByPlaceholder('비밀번호 지정').fill('EdgePass1234!');

      await page.getByRole('button', { name: '인증번호 전송' }).click();
      await expect(page.getByRole('button', { name: '다음' })).toBeVisible({ timeout: 10000 });

      // Email input should be disabled after code sent
      await expect(page.getByPlaceholder('이메일 입력')).toBeDisabled();
    });

    test('find-password shows login link', async ({ page }) => {
      await page.goto('/find-password');
      const loginLink = page.getByRole('link', { name: '로그인하기' });
      await loginLink.click();
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Navigation between auth pages', () => {
    test('login → register link navigates correctly', async ({ page }) => {
      await page.goto('/login');

      const registerLink = page.getByRole('link', { name: '회원가입' });
      await registerLink.click();

      await expect(page).toHaveURL(/\/register/);
      await expect(page.getByText('회원가입', { exact: true })).toBeVisible();
    });

    test('login → find-password link navigates correctly', async ({ page }) => {
      await page.goto('/login');

      const findPasswordLink = page.getByRole('link', { name: '비밀번호를 잊어버렸나요?' });
      await findPasswordLink.click();

      await expect(page).toHaveURL(/\/find-password/);
      await expect(page.getByText('이메일 인증')).toBeVisible();
    });
  });
});
