import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorButton } from './index';

describe('EditorButton', () => {
  it('renders correctly', () => {
    render(<EditorButton>Click Me</EditorButton>);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<EditorButton onClick={onClick}>Click Me</EditorButton>);

    await userEvent.click(screen.getByRole('button', { name: 'Click Me' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when isLoading is true', () => {
    render(<EditorButton isLoading>Loading</EditorButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
