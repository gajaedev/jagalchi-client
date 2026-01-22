import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorInput } from './index';

describe('EditorInput', () => {
  it('레이블과 함께 렌더링된다', () => {
    render(<EditorInput label="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('입력 필드가 36px 높이(h-9)를 가진다', () => {
    const { container } = render(<EditorInput />);
    const input = container.querySelector('input') as HTMLElement;

    expect(input.className).toContain('h-9');
  });

  it('사용자 입력이 올바르게 처리된다', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<EditorInput onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Test');

    expect(onChange).toHaveBeenCalled();
  });

  it('에러 메시지를 표시한다', () => {
    render(<EditorInput error="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('에러 상태일 때 빨간색 border를 적용한다', () => {
    const { container } = render(<EditorInput error="Error message" />);
    const input = container.querySelector('input') as HTMLElement;

    expect(input.className).toContain('border-red-500');
  });

  it('비활성화 상태를 올바르게 처리한다', () => {
    render(<EditorInput disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('placeholder를 표시한다', () => {
    render(<EditorInput placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });
});
