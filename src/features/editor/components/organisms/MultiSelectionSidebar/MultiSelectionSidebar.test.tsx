import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { MultiSelectionSidebar } from './index';

describe('MultiSelectionSidebar', () => {
  it('does not render when closed', () => {
    render(
      <MultiSelectionSidebar
        open={false}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.queryByText('다중 선택')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByText('다중 선택')).toBeInTheDocument();
  });

  it('displays selection count', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={5}
      />,
    );

    expect(screen.getByText('5개 노드')).toBeInTheDocument();
  });

  it('displays correct label for different selection types', () => {
    const { rerender } = render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="line"
        selectedCount={2}
      />,
    );

    expect(screen.getByText('2개 선')).toBeInTheDocument();

    rerender(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="section"
        selectedCount={3}
      />,
    );

    expect(screen.getByText('3개 섹션')).toBeInTheDocument();
  });

  it('shows color input for non-mixed selections', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByLabelText('공통 색상')).toBeInTheDocument();
  });

  it('hides color input for mixed selections', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="mixed"
        selectedCount={5}
      />,
    );

    expect(screen.queryByLabelText('공통 색상')).not.toBeInTheDocument();
    expect(screen.getByText(/다른 종류의 요소가 선택되어/)).toBeInTheDocument();
  });

  it('shows lock actions for node, section, and text', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByRole('button', { name: '잠금' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '잠금 해제' })).toBeInTheDocument();
  });

  it('hides lock actions for line selections', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="line"
        selectedCount={2}
      />,
    );

    expect(screen.queryByRole('button', { name: '잠금' })).not.toBeInTheDocument();
  });

  it('calls onBulkDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleBulkDelete = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        onBulkDelete={handleBulkDelete}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(handleBulkDelete).toHaveBeenCalledOnce();
  });

  it('calls onBulkDuplicate when duplicate button is clicked', async () => {
    const user = userEvent.setup();
    const handleBulkDuplicate = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        onBulkDuplicate={handleBulkDuplicate}
      />,
    );

    const duplicateButton = screen.getByRole('button', { name: '복제' });
    await user.click(duplicateButton);

    expect(handleBulkDuplicate).toHaveBeenCalledOnce();
  });

  it('calls onBulkUpdate when color is changed', async () => {
    const user = userEvent.setup();
    const handleBulkUpdate = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        onBulkUpdate={handleBulkUpdate}
      />,
    );

    const colorInput = screen.getByLabelText('공통 색상');
    await user.clear(colorInput);
    await user.type(colorInput, '#FF0000');

    expect(handleBulkUpdate).toHaveBeenCalled();
  });
});
