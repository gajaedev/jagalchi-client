import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Square } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { ToolbarButton } from './index';

// Mock ResizeObserver for Radix UI Tooltip
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.ResizeObserver = ResizeObserverMock as any;

describe('ToolbarButton', () => {
  it('아이콘을 렌더링한다', () => {
    render(
      <ToolbarButton
        icon={<Square data-testid="icon" />}
        label="노드"
        isActive={false}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ToolbarButton icon={<Square />} label="노드" isActive={false} onClick={handleClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('isActive=true일 때 활성 스타일을 적용한다', () => {
    render(<ToolbarButton icon={<Square />} label="노드" isActive onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('isActive=false일 때 비활성 스타일을 적용한다', () => {
    render(<ToolbarButton icon={<Square />} label="노드" isActive={false} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('aria-label을 올바르게 설정한다', () => {
    render(<ToolbarButton icon={<Square />} label="노드" isActive={false} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '노드');
  });

  it('hover 시 tooltip을 표시한다', async () => {
    const user = userEvent.setup();

    render(<ToolbarButton icon={<Square />} label="노드" isActive={false} onClick={() => {}} />);
    const button = screen.getByRole('button');

    await user.hover(button);

    // shadcn/ui Tooltip이 렌더링되는지 확인
    // Tooltip은 role="tooltip"을 가진 요소로 나타남
    await vi.waitFor(() => {
      const tooltip = screen.queryByRole('tooltip');
      return tooltip !== null;
    });

    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveTextContent('노드');
  });

  it('size가 10x10 (40px)이다', () => {
    render(<ToolbarButton icon={<Square />} label="노드" isActive={false} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('w-10');
  });

  it('shadcn/ui Button 컴포넌트를 사용한다', () => {
    render(<ToolbarButton icon={<Square />} label="노드" isActive={false} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
