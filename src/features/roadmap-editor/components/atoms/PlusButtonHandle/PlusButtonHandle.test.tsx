import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { PlusButtonHandle } from './index';

describe('PlusButtonHandle', () => {
  it('버튼을 렌더링한다', () => {
    const { container } = render(<PlusButtonHandle position="top" onCreateNode={() => {}} />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('클릭 시 onCreateNode 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleCreateNode = vi.fn();

    const { container } = render(
      <PlusButtonHandle position="top" onCreateNode={handleCreateNode} />,
    );
    const button = container.querySelector('button')!;

    await user.click(button);
    expect(handleCreateNode).toHaveBeenCalledWith('top');
  });

  it('position에 따라 올바른 위치 클래스를 적용한다', () => {
    const { container: topContainer } = render(
      <PlusButtonHandle position="top" onCreateNode={() => {}} />,
    );
    const topButton = topContainer.querySelector('button');
    expect(topButton).toHaveClass('-top-8');

    const { container: rightContainer } = render(
      <PlusButtonHandle position="right" onCreateNode={() => {}} />,
    );
    const rightButton = rightContainer.querySelector('button');
    expect(rightButton).toHaveClass('-right-8');

    const { container: bottomContainer } = render(
      <PlusButtonHandle position="bottom" onCreateNode={() => {}} />,
    );
    const bottomButton = bottomContainer.querySelector('button');
    expect(bottomButton).toHaveClass('-bottom-8');

    const { container: leftContainer } = render(
      <PlusButtonHandle position="left" onCreateNode={() => {}} />,
    );
    const leftButton = leftContainer.querySelector('button');
    expect(leftButton).toHaveClass('-left-8');
  });

  it('Plus 아이콘을 표시한다', () => {
    const { container } = render(<PlusButtonHandle position="top" onCreateNode={() => {}} />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('aria-label을 가진다', () => {
    const { container } = render(<PlusButtonHandle position="top" onCreateNode={() => {}} />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', '위쪽에 노드 추가');
  });

  it('hover 시 ghost node를 표시한다', async () => {
    const user = userEvent.setup();

    const { container } = render(<PlusButtonHandle position="top" onCreateNode={() => {}} />);
    const button = container.querySelector('button')!;

    // Hover
    await user.hover(button);

    // Ghost node가 나타나는지 확인
    const ghostNode = container.querySelector('.pointer-events-none');
    expect(ghostNode).toBeInTheDocument();
    expect(ghostNode).toHaveTextContent('New Node');
  });

  it('unhover 시 ghost node를 숨긴다', async () => {
    const user = userEvent.setup();

    const { container } = render(<PlusButtonHandle position="top" onCreateNode={() => {}} />);
    const button = container.querySelector('button')!;

    // Hover
    await user.hover(button);
    expect(container.querySelector('.pointer-events-none')).toBeInTheDocument();

    // Unhover
    await user.unhover(button);
    expect(container.querySelector('.pointer-events-none')).not.toBeInTheDocument();
  });
});
