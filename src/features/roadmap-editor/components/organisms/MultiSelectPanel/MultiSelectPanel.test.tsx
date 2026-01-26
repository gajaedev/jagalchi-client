import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { MultiSelectPanel } from './index';

describe('MultiSelectPanel', () => {
  const mockItems = [
    { id: 'node-1', type: 'node' as const, title: 'Node 1', color: '#3b82f6' },
    { id: 'node-2', type: 'node' as const, title: 'Node 2', color: '#10b981' },
    { id: 'edge-1', type: 'edge' as const, title: 'Edge 1', color: '#3b82f6' },
  ];

  const defaultProps = {
    selectedItems: mockItems,
    onColorChange: vi.fn(),
    onDelete: vi.fn(),
    onClear: vi.fn(),
  };

  it('renders with selected items count', () => {
    render(<MultiSelectPanel {...defaultProps} />);

    expect(screen.getByText('Multi-Select (3)')).toBeInTheDocument();
  });

  it('displays selection summary with correct counts', () => {
    render(<MultiSelectPanel {...defaultProps} />);

    expect(screen.getByText('Nodes:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Edges:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(<MultiSelectPanel {...defaultProps} onClear={handleClear} />);

    const clearButton = screen.getByLabelText('Clear selection');
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(<MultiSelectPanel {...defaultProps} onDelete={handleDelete} />);

    const deleteButton = screen.getByText(/Delete All/i);
    await user.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('shows mixed color indicator when items have different colors', () => {
    render(<MultiSelectPanel {...defaultProps} />);

    expect(screen.getByText('Color (Mixed)')).toBeInTheDocument();
    expect(
      screen.getByText('Selected items have different colors. Changing will apply to all.'),
    ).toBeInTheDocument();
  });

  it('does not show mixed color indicator when all items have same color', () => {
    const sameColorItems = [
      { id: 'node-1', type: 'node' as const, title: 'Node 1', color: '#3b82f6' },
      { id: 'node-2', type: 'node' as const, title: 'Node 2', color: '#3b82f6' },
    ];

    render(<MultiSelectPanel {...defaultProps} selectedItems={sameColorItems} />);

    expect(screen.queryByText('Color (Mixed)')).not.toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('displays selected items in the list when section is expanded', async () => {
    const user = userEvent.setup();
    render(<MultiSelectPanel {...defaultProps} />);

    // Expand the "Selected Items" section
    const selectedItemsButton = screen.getByRole('button', { name: /Selected Items/i });
    await user.click(selectedItemsButton);

    expect(screen.getByText('Node 1')).toBeInTheDocument();
    expect(screen.getByText('Node 2')).toBeInTheDocument();
    expect(screen.getByText('Edge 1')).toBeInTheDocument();
  });

  it('shows color indicators for items with colors when section is expanded', async () => {
    const user = userEvent.setup();
    render(<MultiSelectPanel {...defaultProps} />);

    // Expand the "Selected Items" section
    const selectedItemsButton = screen.getByRole('button', { name: /Selected Items/i });
    await user.click(selectedItemsButton);

    const colorIndicators = screen.getAllByLabelText(/Color:/);
    expect(colorIndicators).toHaveLength(3);
  });
});
