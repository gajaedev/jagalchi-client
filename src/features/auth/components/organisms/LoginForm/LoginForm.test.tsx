import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { LoginForm } from './index';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

const mockMutate = vi.fn();
vi.mock('../../../hooks/use-login', () => ({
  useLogin: () => ({
    mutate: mockMutate,
    isPending: false,
    isError: false,
    error: null,
  }),
}));

describe('LoginForm', () => {
  it('이메일, 비밀번호 필드와 로그인 버튼을 렌더링한다', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 입력')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('비밀번호 찾기 링크를 렌더링한다', () => {
    render(<LoginForm />);
    expect(screen.getByText('비밀번호를 잊어버렸나요?')).toHaveAttribute('href', '/find-password');
  });

  it('Google 로그인 버튼을 렌더링한다', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /Google로 로그인/i })).toBeInTheDocument();
  });

  it('GitHub 로그인 버튼을 렌더링한다', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /GitHub로 로그인/i })).toBeInTheDocument();
  });

  it('로그인 버튼과 소셜 버튼 사이에 구분선이 있다', () => {
    render(<LoginForm />);
    expect(document.querySelector('[data-slot="separator"]')).toBeInTheDocument();
  });

  it('이메일이 비어있으면 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('이메일을 입력해주세요')).toBeInTheDocument();
    });
  });

  it('비밀번호가 비어있으면 에러 메시지를 표시한다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.getByText('비밀번호를 입력해주세요')).toBeInTheDocument();
    });
  });

  it('유효한 데이터로 제출할 수 있다', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('이메일 입력'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('비밀번호 입력'), 'password123');
    await user.click(screen.getByRole('button', { name: '로그인' }));

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
