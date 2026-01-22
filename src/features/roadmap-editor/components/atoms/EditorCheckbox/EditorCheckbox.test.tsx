import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EditorCheckbox } from './index';

describe('EditorCheckbox', () => {
  it('renders checkbox with label', () => {
    render(<EditorCheckbox label="Accept terms" id="terms" />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders checkbox without label', () => {
    render(<EditorCheckbox aria-label="Checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('handles checked state', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<EditorCheckbox label="Option" checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies indeterminate state', () => {
    render(<EditorCheckbox label="Select all" indeterminate />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('clears indeterminate when checked', () => {
    const { rerender } = render(
      <EditorCheckbox label="Select all" indeterminate checked={false} />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);

    rerender(<EditorCheckbox label="Select all" indeterminate={false} checked />);
    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox.checked).toBe(true);
  });

  it('disables checkbox when disabled prop is true', () => {
    render(<EditorCheckbox label="Disabled option" disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<EditorCheckbox label="Custom" className="custom-class" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.className).toContain('custom-class');
  });
});
