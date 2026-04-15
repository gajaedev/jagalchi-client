import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

vi.mock('../../hooks/use-reset-password', () => ({
  useResetPassword: () => ({
    mutate: vi.fn((_data: unknown, options?: { onSuccess?: () => void }) => {
      options?.onSuccess?.();
    }),
    isPending: false,
  }),
}));

vi.mock('../../hooks/use-send-password-reset-code', () => ({
  useSendPasswordResetCode: () => ({
    mutate: vi.fn((_data: unknown, options?: { onSuccess?: () => void }) => {
      options?.onSuccess?.();
    }),
    isPending: false,
  }),
}));

vi.mock('../../hooks/use-verify-password-reset-code', () => ({
  useVerifyPasswordResetCode: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
    error: null,
  }),
}));

import { FindPasswordForm } from './FindPasswordForm';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderForm = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <FindPasswordForm />
    </QueryClientProvider>,
  );

describe('FindPasswordForm', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('초기에 step 1 (이메일/인증번호) 폼을 렌더링한다', () => {
    renderForm();
    expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('인증번호 입력')).toBeInTheDocument();
  });

  it('초기에 인증번호 전송 버튼을 렌더링한다', () => {
    renderForm();
    expect(screen.getByRole('button', { name: '인증번호 전송' })).toBeInTheDocument();
  });

  it('인증번호 전송 클릭 후 다음 버튼을 렌더링한다', async () => {
    const user = userEvent.setup();
    renderForm();

    const emailInput = screen.getByPlaceholderText('이메일 입력');
    await user.type(emailInput, 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });
  });

  it('인증번호 전송 후 재전송 버튼을 표시한다', async () => {
    const user = userEvent.setup();
    renderForm();

    const emailInput = screen.getByPlaceholderText('이메일 입력');
    await user.type(emailInput, 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    await waitFor(() => {
      expect(screen.getByText(/재전송/)).toBeInTheDocument();
    });
  });

  it('step 1 제출 후 step 2 (새 비밀번호) 폼으로 전환된다', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('비밀번호 입력')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호 다시 입력')).toBeInTheDocument();
    });
  });

  it('step 2에서 완료 버튼을 렌더링한다', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '완료' })).toBeInTheDocument();
    });
  });

  it('step 2에서 비밀번호 불일치 시 에러를 표시한다', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('비밀번호 입력')).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('비밀번호 입력'), 'Password1!');
    await user.type(screen.getByPlaceholderText('비밀번호 다시 입력'), 'Different1!');
    await user.click(screen.getByRole('button', { name: '완료' }));

    await waitFor(() => {
      expect(screen.getByText(/비밀번호가 일치하지 않습니다/)).toBeInTheDocument();
    });
  });

  it('onStepChange 콜백을 step 전환 시 호출한다', async () => {
    const onStepChange = vi.fn();
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <FindPasswordForm onStepChange={onStepChange} />
      </QueryClientProvider>,
    );

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(onStepChange).toHaveBeenCalled();
    });
  });
});
