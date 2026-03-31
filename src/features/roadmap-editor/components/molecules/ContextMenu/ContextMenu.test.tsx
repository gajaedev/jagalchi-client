import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ContextMenu } from './index';

describe('ContextMenu', () => {
  it('renders children trigger correctly', () => {
    render(
      <ContextMenu>
        <div>Trigger Area</div>
      </ContextMenu>,
    );
    expect(screen.getByText('Trigger Area')).toBeInTheDocument();
  });

  // Note: Radix UI ContextMenu is hard to test due to pointer/context-menu events,
  // but we can ensure it mounts without crashing.
  it('mounts without crashing', () => {
    const { container } = render(
      <ContextMenu onCopy={vi.fn()} onDelete={vi.fn()}>
        <div>Right click me</div>
      </ContextMenu>,
    );
    expect(container).toBeInTheDocument();
  });
});
