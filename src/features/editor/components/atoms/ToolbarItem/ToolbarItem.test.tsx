import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { ToolbarItem } from './index';

vi.mock('lucide-react', () => ({
  Square: () => <span data-testid="square-icon" />,
}));

describe('ToolbarItem', () => {
  const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

  it('아이콘과 함께 렌더링된다', () => {
    render(<ToolbarItem icon={<MockIcon />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('label이 제공되면 텍스트를 표시한다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드" />);
    expect(screen.getByText('노드')).toBeInTheDocument();
  });

  it('label이 없으면 텍스트를 표시하지 않는다', () => {
    render(<ToolbarItem icon={<MockIcon />} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Icon');
  });

  it('active 상태일 때 aria-pressed가 true이다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드" active={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('비활성 상태일 때 aria-pressed가 false이다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드" active={false} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('disabled 상태일 때 버튼이 비활성화된다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드" disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ToolbarItem icon={<MockIcon />} label="노드" onClick={handleClick} />);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태일 때 onClick이 호출되지 않는다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ToolbarItem icon={<MockIcon />} label="노드" disabled={true} onClick={handleClick} />);

    // disabled 버튼은 클릭해도 핸들러가 호출되지 않는다
    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('aria-label이 올바르게 설정된다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드 추가" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', '노드 추가');
  });

  it('type이 button이다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('커스텀 className이 적용된다', () => {
    render(<ToolbarItem icon={<MockIcon />} label="노드" className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('active 상태일 때 적절한 클래스가 적용된다', () => {
    const { rerender } = render(<ToolbarItem icon={<MockIcon />} active={false} />);
    const button = screen.getByRole('button');

    expect(button).not.toHaveClass('bg-primary');

    rerender(<ToolbarItem icon={<MockIcon />} active={true} />);
    expect(button).toHaveClass('bg-primary');
  });
});
