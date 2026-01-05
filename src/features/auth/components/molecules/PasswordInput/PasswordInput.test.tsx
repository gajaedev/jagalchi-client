import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PasswordInput } from './index';

describe('PasswordInput', () => {
  it('기본적으로 비밀번호가 숨겨져 있다', () => {
    render(<PasswordInput data-testid="password-input" />);
    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
  });

  it('토글 버튼 클릭 시 비밀번호가 보인다', async () => {
    const user = userEvent.setup();
    render(<PasswordInput data-testid="password-input" />);

    const toggleButton = screen.getByRole('button', { name: '비밀번호 보기' });
    await user.click(toggleButton);

    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'text');
  });

  it('토글 버튼 두 번 클릭 시 비밀번호가 다시 숨겨진다', async () => {
    const user = userEvent.setup();
    render(<PasswordInput data-testid="password-input" />);

    const toggleButton = screen.getByRole('button', { name: '비밀번호 보기' });
    await user.click(toggleButton);

    const hideButton = screen.getByRole('button', { name: '비밀번호 숨기기' });
    await user.click(hideButton);

    expect(screen.getByTestId('password-input')).toHaveAttribute('type', 'password');
  });

  it('placeholder를 표시한다', () => {
    render(<PasswordInput placeholder="비밀번호 입력" />);
    expect(screen.getByPlaceholderText('비밀번호 입력')).toBeInTheDocument();
  });
});
