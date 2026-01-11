import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Square } from 'lucide-react';

import { ToolbarItem } from './index';

describe('ToolbarItem', () => {
  it('renders without crashing', () => {
    render(<ToolbarItem icon={<Square />} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<ToolbarItem icon={<Square />} label="Node" />);
    expect(screen.getByRole('button', { name: 'Node' })).toBeInTheDocument();
  });

  it('applies active state', () => {
    render(<ToolbarItem icon={<Square />} active={true} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies disabled state', () => {
    render(<ToolbarItem icon={<Square />} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ToolbarItem icon={<Square />} onClick={handleClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<ToolbarItem icon={<Square />} onClick={handleClick} disabled={true} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
