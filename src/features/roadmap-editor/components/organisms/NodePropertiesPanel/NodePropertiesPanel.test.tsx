import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NodePropertiesPanel } from './index';

describe('NodePropertiesPanel', () => {
  const mockProps = {
    nodeId: 'node-1',
    title: 'Test Node',
    description: 'Test description',
    color: '#3b82f6',
    onTitleChange: vi.fn(),
    onDescriptionChange: vi.fn(),
    onColorChange: vi.fn(),
  };

  it('320px 너비(w-80)로 렌더링된다', () => {
    const { container } = render(<NodePropertiesPanel {...mockProps} />);
    const panel = container.firstChild as HTMLElement;

    expect(panel.className).toContain('w-80');
  });

  it('헤더를 렌더링한다', () => {
    render(<NodePropertiesPanel {...mockProps} />);

    expect(screen.getByText('Node Properties')).toBeInTheDocument();
  });

  it('Node ID를 읽기 전용으로 표시한다', () => {
    render(<NodePropertiesPanel {...mockProps} />);

    const nodeIdInput = screen.getByLabelText('Node ID (read-only)');
    expect(nodeIdInput).toBeDisabled();
    expect(nodeIdInput).toHaveValue('node-1');
  });

  it('제목을 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodePropertiesPanel {...mockProps} />);

    const titleInput = screen.getByLabelText('Title');
    await user.clear(titleInput);
    await user.type(titleInput, 'New Title');

    expect(mockProps.onTitleChange).toHaveBeenCalled();
  });

  it('설명을 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodePropertiesPanel {...mockProps} />);

    const descriptionInput = screen.getByLabelText('Description');
    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'New Description');

    expect(mockProps.onDescriptionChange).toHaveBeenCalled();
  });

  it('삭제 버튼이 제공될 때 렌더링된다', () => {
    const onDelete = vi.fn();

    render(<NodePropertiesPanel {...mockProps} onDelete={onDelete} />);

    expect(screen.getByLabelText('Delete node')).toBeInTheDocument();
  });

  it('Basic Info와 Style 섹션을 렌더링한다', () => {
    render(<NodePropertiesPanel {...mockProps} />);

    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Style')).toBeInTheDocument();
  });
});
