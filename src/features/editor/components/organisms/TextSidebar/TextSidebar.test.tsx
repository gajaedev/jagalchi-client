import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { TextSidebar } from './index';

vi.mock('lucide-react', () => ({
  Lock: () => <span data-testid="lock-icon" />,
  Minus: () => <span data-testid="minus-icon" />,
  Plus: () => <span data-testid="plus-icon" />,
  Bold: () => <span data-testid="bold-icon" />,
}));

describe('TextSidebar', () => {
  it('기본 요소들이 렌더링된다', () => {
    render(<TextSidebar />);

    expect(screen.getByText('텍스트 편집')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByLabelText('텍스트 내용')).toBeInTheDocument();
    expect(screen.getByLabelText('글자 크기')).toBeInTheDocument();
  });

  it('기본값이 올바르게 설정된다', () => {
    render(<TextSidebar />);

    const contentTextarea = screen.getByLabelText('텍스트 내용') as HTMLTextAreaElement;
    expect(contentTextarea.value).toBe('');

    const fontSizeInput = screen.getByLabelText('글자 크기') as HTMLInputElement;
    expect(fontSizeInput.value).toBe('16');
  });

  it('텍스트 내용을 변경할 수 있다', async () => {
    const user = userEvent.setup();
    render(<TextSidebar />);

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    await user.type(contentTextarea, '새로운 텍스트');

    expect(contentTextarea).toHaveValue('새로운 텍스트');
  });

  it('글자 크기 증가 버튼을 클릭하면 크기가 증가한다', async () => {
    const user = userEvent.setup();
    render(<TextSidebar />);

    const fontSizeInput = screen.getByLabelText('글자 크기') as HTMLInputElement;
    const increaseButton = screen.getByLabelText('글자 크기 증가');

    expect(fontSizeInput.value).toBe('16');

    await user.click(increaseButton);

    expect(fontSizeInput.value).toBe('17');
  });

  it('글자 크기 증가/감소 버튼이 있다', () => {
    render(<TextSidebar />);

    const decreaseButton = screen.getByLabelText('글자 크기 감소');
    const increaseButton = screen.getByLabelText('글자 크기 증가');

    expect(decreaseButton).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();
  });

  it('글자 굵기 버튼들이 렌더링된다', () => {
    render(<TextSidebar />);

    expect(screen.getByRole('button', { name: /보통/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /굵게/i })).toBeInTheDocument();
  });

  it('색상 입력이 렌더링된다', () => {
    render(<TextSidebar />);

    const colorInput = screen.getByLabelText('글자 색상') as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();
    expect(colorInput.type).toBe('color');
    expect(colorInput.value).toBe('#000000');
  });

  it('잠금 토글이 있다', () => {
    render(<TextSidebar />);

    const lockSwitch = screen.getByRole('switch', { name: /잠금/i });
    expect(lockSwitch).toBeInTheDocument();
  });
});
