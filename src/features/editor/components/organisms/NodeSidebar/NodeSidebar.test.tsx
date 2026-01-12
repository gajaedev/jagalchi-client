import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { NodeSidebar } from './index';

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
  Lock: () => <span data-testid="lock-icon" />,
  Plus: () => <span data-testid="plus-icon" />,
}));

describe('NodeSidebar', () => {
  const defaultNodeData = {
    title: '테스트 노드',
    description: '테스트 설명',
    resources: [{ id: 'test-resource-1', url: 'https://example.com', title: 'Example' }],
    color: '#3B82F6',
    locked: false,
  };

  it('닫혀있을 때 렌더링되지 않는다', () => {
    render(<NodeSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('노드 편집')).not.toBeInTheDocument();
  });

  it('열려있을 때 렌더링된다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('노드 편집')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
  });

  it('nodeData를 표시한다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const titleInput = screen.getByLabelText('노드 이름');
    expect(titleInput).toHaveValue('테스트 노드');

    const descriptionTextarea = screen.getByLabelText('노드 설명');
    expect(descriptionTextarea).toHaveValue('테스트 설명');
  });

  it('nodeData가 없을 때 기본값을 사용한다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} />);

    const titleInput = screen.getByLabelText('노드 이름');
    expect(titleInput).toHaveValue('');

    const descriptionTextarea = screen.getByLabelText('노드 설명');
    expect(descriptionTextarea).toHaveValue('');
  });

  it('닫기 버튼 클릭 시 onOpenChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(<NodeSidebar open={true} onOpenChange={handleOpenChange} />);

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('title을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const titleInput = screen.getByLabelText('노드 이름');
    await user.clear(titleInput);
    await user.type(titleInput, '새 노드');

    expect(titleInput).toHaveValue('새 노드');
  });

  it('description을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const descriptionTextarea = screen.getByLabelText('노드 설명');
    await user.clear(descriptionTextarea);
    await user.type(descriptionTextarea, '새 설명');

    expect(descriptionTextarea).toHaveValue('새 설명');
  });

  it('color picker로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const colorPicker = screen.getByLabelText('기본 컬러');
    await user.click(colorPicker);

    expect(colorPicker).toHaveAttribute('type', 'color');
    expect(colorPicker).toHaveValue('#3b82f6'); // 브라우저가 소문자로 정규화
  });

  it('텍스트 입력으로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    // 첫 번째는 color picker(#3b82f6), 두 번째는 text input(#3B82F6)
    const inputs = screen.getAllByDisplayValue(/3b82f6/i);
    const textColorInput = inputs.find((input) => input.getAttribute('type') === 'text')!;

    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    expect(textColorInput).toHaveValue('#ff0000');
  });

  it('기존 resources를 표시한다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Example')).toBeInTheDocument();
  });

  it('resources가 없을 때 안내 메시지를 표시한다', () => {
    render(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={{ ...defaultNodeData, resources: [] }}
      />,
    );

    expect(screen.getByText('첨부된 자료가 없습니다')).toBeInTheDocument();
  });

  it('새 resource를 추가할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={{ ...defaultNodeData, resources: [] }}
      />,
    );

    const addButton = screen.getByRole('button', { name: '자료 추가' });
    await user.click(addButton);

    expect(screen.getByLabelText('자료 링크')).toBeInTheDocument();
    expect(screen.getByLabelText('자료 제목')).toBeInTheDocument();
  });

  it('resource를 삭제할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const removeButton = screen.getByRole('button', { name: '자료 삭제' });
    await user.click(removeButton);

    expect(screen.queryByDisplayValue('https://example.com')).not.toBeInTheDocument();
  });

  it('여러 resources를 관리할 수 있다', async () => {
    const user = userEvent.setup();
    const multipleResources = {
      ...defaultNodeData,
      resources: [
        { id: 'test-resource-1', url: 'https://example1.com', title: 'Example 1' },
        { id: 'test-resource-2', url: 'https://example2.com', title: 'Example 2' },
      ],
    };

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={multipleResources} />);

    expect(screen.getByDisplayValue('https://example1.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example2.com')).toBeInTheDocument();

    // 첫 번째 resource 삭제
    const removeButtons = screen.getAllByRole('button', { name: '자료 삭제' });
    await user.click(removeButtons[0]);

    expect(screen.queryByDisplayValue('https://example1.com')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example2.com')).toBeInTheDocument();
  });

  it('lock toggle을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const lockSwitch = screen.getByRole('switch');
    expect(lockSwitch).toHaveAttribute('aria-checked', 'false');

    await user.click(lockSwitch);

    expect(lockSwitch).toHaveAttribute('aria-checked', 'true');
  });

  it('저장 버튼 클릭 시 onSave를 호출한다', async () => {
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

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith({
      title: '테스트 노드',
      description: '테스트 설명',
      resources: [{ id: 'test-resource-1', url: 'https://example.com', title: 'Example' }],
      color: '#3B82F6',
      locked: false,
    });
  });

  it('onSave가 없으면 저장 버튼이 비활성화된다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const saveButton = screen.getByRole('button', { name: '저장' });
    expect(saveButton).toBeDisabled();
  });

  it('nodeData prop 변경 시 내부 state가 업데이트된다', () => {
    const { rerender } = render(
      <NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />,
    );

    const titleInput = screen.getByLabelText('노드 이름');
    expect(titleInput).toHaveValue('테스트 노드');

    rerender(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={{ ...defaultNodeData, title: '업데이트된 노드' }}
      />,
    );

    expect(titleInput).toHaveValue('업데이트된 노드');
  });

  it('여러 속성을 변경한 후 저장할 수 있다', async () => {
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

    // Title 변경
    const titleInput = screen.getByLabelText('노드 이름');
    await user.clear(titleInput);
    await user.type(titleInput, '변경된 노드');

    // Description 변경
    const descriptionTextarea = screen.getByLabelText('노드 설명');
    await user.clear(descriptionTextarea);
    await user.type(descriptionTextarea, '변경된 설명');

    // 색상 변경
    const inputs = screen.getAllByDisplayValue(/3b82f6/i);
    const textColorInput = inputs.find((input) => input.getAttribute('type') === 'text')!;
    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    // Lock 변경
    const lockSwitch = screen.getByRole('switch');
    await user.click(lockSwitch);

    // 저장
    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      title: '변경된 노드',
      description: '변경된 설명',
      resources: [{ id: 'test-resource-1', url: 'https://example.com', title: 'Example' }],
      color: '#ff0000',
      locked: true,
    });
  });

  it('header에 title이 표시된다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    expect(screen.getByText('테스트 노드')).toBeInTheDocument();
  });

  it('title이 없으면 기본 텍스트를 표시한다', () => {
    render(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={{ ...defaultNodeData, title: '' }}
      />,
    );

    expect(screen.getByText('노드 편집')).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <NodeSidebar
        open={true}
        onOpenChange={vi.fn()}
        nodeData={defaultNodeData}
        className="custom-sidebar"
      />,
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('custom-sidebar');
  });

  it('ScrollArea가 올바르게 렌더링된다', () => {
    render(<NodeSidebar open={true} onOpenChange={vi.fn()} nodeData={defaultNodeData} />);

    const scrollArea = document.querySelector('.h-full');
    expect(scrollArea).toBeInTheDocument();
  });
});
