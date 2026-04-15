import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RegisterForm } from './RegisterForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

vi.mock('../../hooks/use-register', () => ({
  useRegister: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

vi.mock('../../hooks/use-verify-code', () => ({
  useVerifyCode: () => ({
    mutate: (_data: unknown, options?: { onSuccess?: () => void }) => {
      options?.onSuccess?.();
    },
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

vi.mock('../../hooks/use-send-verification-code', () => ({
  useSendVerificationCode: () => ({
    mutate: (_data: unknown, options?: { onSuccess?: () => void }) => {
      options?.onSuccess?.();
    },
    isPending: false,
  }),
}));

describe('RegisterForm', () => {
  it('초기에 step 1 (이메일/비밀번호/인증번호) 폼을 렌더링한다', () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 지정')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('인증번호 입력')).toBeInTheDocument();
  });

  it('step 1 제출 후 step 2 (사용자 이름) 폼으로 전환된다', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('비밀번호 지정'), 'Password1!');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('사용자 이름 입력')).toBeInTheDocument();
    });
  });

  it('step 2 제출 후 step 3 (링크 추가) 폼으로 전환된다', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    // Step 1
    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('비밀번호 지정'), 'Password1!');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    // Step 2
    await waitFor(() => {
      expect(screen.getByPlaceholderText('사용자 이름 입력')).toBeInTheDocument();
    });
    await user.type(screen.getByPlaceholderText('사용자 이름 입력'), '홍길동');
    await user.click(screen.getByRole('button', { name: '확인' }));

    // Step 3
    await waitFor(() => {
      expect(screen.getByText('1번 링크')).toBeInTheDocument();
    });
  });

  it('step 3에서 건너뛰기 버튼을 렌더링한다', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    // Step 1
    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('비밀번호 지정'), 'Password1!');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    // Step 2
    await waitFor(() => {
      expect(screen.getByPlaceholderText('사용자 이름 입력')).toBeInTheDocument();
    });
    await user.type(screen.getByPlaceholderText('사용자 이름 입력'), '홍길동');
    await user.click(screen.getByRole('button', { name: '확인' }));

    // Step 3
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '건너뛰기' })).toBeInTheDocument();
    });
  });

  it('onStepChange 콜백을 step 전환 시 호출한다', async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();
    render(<RegisterForm onStepChange={onStepChange} />);

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('비밀번호 지정'), 'Password1!');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(onStepChange).toHaveBeenCalledWith(
        2,
        '사용자 이름 설정',
        '사용자 이름을 입력해주세요',
      );
    });
  });
});
