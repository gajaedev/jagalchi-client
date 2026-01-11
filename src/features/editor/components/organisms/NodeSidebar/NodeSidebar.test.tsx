import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { NodeSidebar } from './index';

describe('NodeSidebar', () => {
  const defaultNodeData = {
    title: 'Test Node',
    description: 'Test Description',
    resources: [{ url: 'https://example.com', title: 'Example' }],
    color: '#3B82F6',
    locked: false,
  };

  it('does not render when closed', () => {
    render(<NodeSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('노드 편집')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('노드 편집')).toBeInTheDocument();
  });

  it('displays node data', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const titleInput = screen.getByLabelText('노드 이름');
    expect(titleInput).toHaveValue('Test Node');

    const descriptionTextarea = screen.getByLabelText('노드 설명');
    expect(descriptionTextarea).toHaveValue('Test Description');
  });

  it('allows changing title', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const titleInput = screen.getByLabelText('노드 이름');
    await user.clear(titleInput);
    await user.type(titleInput, 'New Node');

    expect(titleInput).toHaveValue('New Node');
  });

  it('allows changing description', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const descriptionTextarea = screen.getByLabelText('노드 설명');
    await user.clear(descriptionTextarea);
    await user.type(descriptionTextarea, 'New Description');

    expect(descriptionTextarea).toHaveValue('New Description');
  });

  it('displays existing resources', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Example')).toBeInTheDocument();
  });

  it('allows adding new resources', async () => {
    const user = userEvent.setup();

    render(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={{ ...defaultNodeData, resources: [] }}
      />,
    );

    const addButton = screen.getByRole('button', { name: /자료 추가/ });
    await user.click(addButton);

    // Should show resource input fields
    expect(screen.getByLabelText('자료 링크')).toBeInTheDocument();
  });

  it('allows removing resources', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const removeButton = screen.getByRole('button', { name: '자료 삭제' });
    await user.click(removeButton);

    // Resource should be removed
    expect(screen.queryByDisplayValue('https://example.com')).not.toBeInTheDocument();
  });

  it('calls onSave with updated data', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={defaultNodeData}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Node',
        description: 'Test Description',
      }),
    );
  });

  it('displays title in header when provided', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });
});
