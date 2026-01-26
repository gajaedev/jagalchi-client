import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ConnectionLine } from '.';

describe('ConnectionLine', () => {
  const mockProps = {
    fromX: 0,
    fromY: 0,
    toX: 200,
    toY: 200,
  };

  const renderLine = (props = mockProps) => {
    return render(
      <svg>
        <ConnectionLine {...props} />
      </svg>,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderLine();
    expect(container).toBeInTheDocument();
  });

  it('renders as a g element', () => {
    const { container } = renderLine();
    const gElement = container.querySelector('g');
    expect(gElement).toBeInTheDocument();
  });

  it('renders a path element for the connection line', () => {
    const { container } = renderLine();
    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('stroke', '#b1b1b7');
    expect(path).toHaveAttribute('stroke-width', '2');
  });

  it('shows ghost node when distance is greater than 50', () => {
    const { container } = renderLine({ fromX: 0, fromY: 0, toX: 100, toY: 100 });
    const foreignObject = container.querySelector('foreignObject');
    expect(foreignObject).toBeInTheDocument();
  });

  it('does not show ghost node when distance is less than 50', () => {
    const { container } = renderLine({ fromX: 0, fromY: 0, toX: 30, toY: 30 });
    const foreignObject = container.querySelector('foreignObject');
    expect(foreignObject).not.toBeInTheDocument();
  });

  it('positions ghost node at endpoint', () => {
    const { container } = renderLine({ fromX: 0, fromY: 0, toX: 200, toY: 200 });
    const foreignObject = container.querySelector('foreignObject');
    expect(foreignObject).toHaveAttribute('x', '100'); // toX - 100
    expect(foreignObject).toHaveAttribute('y', '176'); // toY - 24
  });

  it('renders ghost node with "New Node" text', () => {
    const { container } = renderLine();
    expect(container.textContent).toContain('New Node');
  });

  it('is a memo component', () => {
    expect(typeof ConnectionLine).toBe('object');
  });
});
