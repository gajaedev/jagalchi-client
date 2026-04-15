import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RegisterStep1Form } from './RegisterStep1Form';

vi.mock('../../../hooks/use-send-verification-code', () => ({
  useSendVerificationCode: () => ({
    mutate: (_data: unknown, options?: { onSuccess?: () => void }) => {
      options?.onSuccess?.();
    },
    isPending: false,
  }),
}));

vi.mock('../../../hooks/use-verify-code', () => ({
  useVerifyCode: () => ({
    mutate: (_data: unknown, options?: { onSuccess?: () => void }) => {
      options?.onSuccess?.();
    },
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

describe('RegisterStep1Form', () => {
  it('이메일, 비밀번호, 인증번호 필드를 렌더링한다', () => {
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 지정')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('인증번호 입력')).toBeInTheDocument();
  });

  it('초기에 인증번호 전송 버튼을 렌더링한다', () => {
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    expect(screen.getByRole('button', { name: '인증번호 전송' })).toBeInTheDocument();
  });

  it('인증번호 전송 버튼 클릭 후 다음 버튼을 렌더링한다', async () => {
    const user = userEvent.setup();
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
  });

  it('인증번호 전송 후 재전송 버튼을 표시한다', async () => {
    const user = userEvent.setup();
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));

    expect(screen.getByRole('button', { name: '인증번호 재전송' })).toBeInTheDocument();
  });

  it('Google 회원가입 버튼을 렌더링한다', () => {
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    expect(screen.getByRole('button', { name: /Google로 회원가입/i })).toBeInTheDocument();
  });

  it('이메일 없이 제출하면 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
    });
  });

  it('비밀번호 없이 제출하면 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={vi.fn()} />);

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 입력해주세요')).toBeInTheDocument();
    });
  });

  it('유효한 데이터로 제출하면 onSubmit이 호출된다', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<RegisterStep1Form onSubmit={onSubmit} onGoogleRegister={vi.fn()} />);

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('비밀번호 지정'), 'Password1!');
    await user.click(screen.getByRole('button', { name: '인증번호 전송' }));
    await user.type(screen.getByPlaceholderText('인증번호 입력'), '123456');
    await user.click(screen.getByRole('button', { name: '다음' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledOnce();
    });
  });

  it('Google 회원가입 버튼 클릭 시 onGoogleRegister가 호출된다', async () => {
    const user = userEvent.setup();
    const onGoogleRegister = vi.fn();
    render(<RegisterStep1Form onSubmit={vi.fn()} onGoogleRegister={onGoogleRegister} />);

    await user.click(screen.getByRole('button', { name: /Google로 회원가입/i }));

    expect(onGoogleRegister).toHaveBeenCalledOnce();
  });
});
