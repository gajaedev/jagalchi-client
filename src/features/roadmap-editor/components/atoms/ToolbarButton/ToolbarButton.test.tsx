import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ToolbarButton } from './index';

describe('ToolbarButton', () => {
  it('아이콘과 레이블로 렌더링된다', () => {
    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" />);

    expect(screen.getByLabelText('Test button')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('클릭 시 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" onClick={onClick} />);

    const button = screen.getByLabelText('Test button');
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('활성 상태를 올바르게 표시한다', () => {
    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" isActive />);

    const button = screen.getByLabelText('Test button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button.className).toContain('bg-neutral-100');
  });

  it('비활성 상태를 올바르게 표시한다', () => {
    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" isActive={false} />);

    const button = screen.getByLabelText('Test button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button.className).toContain('text-neutral-700');
  });

  it('primary variant를 올바르게 렌더링한다', () => {
    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" variant="primary" />);

    const button = screen.getByLabelText('Test button');
    expect(button.className).toContain('text-primary-500');
  });

  it('disabled 상태를 올바르게 처리한다', () => {
    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" disabled />);

    const button = screen.getByLabelText('Test button');
    expect(button).toBeDisabled();
    expect(button.className).toContain('disabled:cursor-not-allowed');
  });

  it('포커스 스타일을 적용한다', () => {
    render(<ToolbarButton icon={<span>Icon</span>} label="Test button" />);

    const button = screen.getByLabelText('Test button');
    expect(button.className).toContain('focus:ring-2');
    expect(button.className).toContain('focus:ring-primary-500');
  });
});
