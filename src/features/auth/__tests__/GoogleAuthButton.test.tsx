import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { GoogleAuthButton } from '../components/atoms/GoogleAuthButton';

describe('GoogleAuthButton', () => {
  it('로그인 variant일 때 올바른 텍스트를 표시한다', () => {
    render(<GoogleAuthButton variant="login" />);
    expect(screen.getByRole('button')).toHaveTextContent('Google로 로그인');
  });

  it('회원가입 variant일 때 올바른 텍스트를 표시한다', () => {
    render(<GoogleAuthButton variant="register" />);
    expect(screen.getByRole('button')).toHaveTextContent('Google로 회원가입');
  });

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<GoogleAuthButton variant="login" onClick={handleClick} />);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('type이 button이다', () => {
    render(<GoogleAuthButton variant="login" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });
});
