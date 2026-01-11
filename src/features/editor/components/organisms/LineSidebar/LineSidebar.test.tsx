import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { LineSidebar } from './index';

describe('LineSidebar', () => {
  const defaultLineData = {
    style: 'solid' as const,
    color: '#000000',
    label: 'Test Line',
  };

  it('does not render when closed', () => {
    render(<LineSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('선 편집')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('선 편집')).toBeInTheDocument();
  });

  it('displays line data', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    expect(labelInput).toHaveValue('Test Line');
  });

  it('closes sidebar when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(<LineSidebar open={true} onOpenChange={handleOpenChange} />);

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('allows selecting line style', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const dashedButton = screen.getByRole('button', { name: '점선' });
    await user.click(dashedButton);

    // Button should show as active
    expect(dashedButton).toHaveClass(/default/);
  });

  it('allows changing color via color input', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const colorInput = screen.getByLabelText('선 색상');
    await user.clear(colorInput);
    await user.type(colorInput, '#ff0000');

    expect(colorInput).toHaveValue('#ff0000');
  });

  it('allows changing label', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    await user.clear(labelInput);
    await user.type(labelInput, 'New Label');

    expect(labelInput).toHaveValue('New Label');
  });

  it('calls onSave with updated data', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <LineSidebar
        open={true}
        onOpenChange={vi.fn()}
        lineData={defaultLineData}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      style: 'solid',
      color: '#000000',
      label: 'Test Line',
    });
  });

  it('updates internal state when lineData prop changes', () => {
    const { rerender } = render(
      <LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />,
    );

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    expect(labelInput).toHaveValue('Test Line');

    rerender(
      <LineSidebar
        open={true}
        onOpenChange={vi.fn()}
        lineData={{ ...defaultLineData, label: 'Updated Label' }}
      />,
    );

    expect(labelInput).toHaveValue('Updated Label');
  });
});
