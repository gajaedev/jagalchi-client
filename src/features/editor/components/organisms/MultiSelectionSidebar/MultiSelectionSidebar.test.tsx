import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { MultiSelectionSidebar } from './index';

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
  Trash2: () => <span data-testid="trash2-icon" />,
  Copy: () => <span data-testid="copy-icon" />,
  Lock: () => <span data-testid="lock-icon" />,
  Unlock: () => <span data-testid="unlock-icon" />,
}));

describe('MultiSelectionSidebar', () => {
  const defaultCommonProperties = {
    color: '#3B82F6',
  };

  it('닫혀있을 때 렌더링되지 않는다', () => {
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

  it('열려있을 때 렌더링된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByText('다중 선택')).toBeInTheDocument();
    expect(screen.getByText('Multi Selection')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onOpenChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={handleOpenChange}
        selectionType="node"
        selectedCount={3}
      />,
    );

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('선택된 요소 수를 표시한다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={5}
      />,
    );

    expect(screen.getByText('5개 노드')).toBeInTheDocument();
    expect(screen.getByText('5개의 노드이(가) 선택되었습니다.')).toBeInTheDocument();
  });

  it('node 선택 타입을 표시한다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByText('3개 노드')).toBeInTheDocument();
  });

  it('line 선택 타입을 표시한다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="line"
        selectedCount={2}
      />,
    );

    expect(screen.getByText('2개 선')).toBeInTheDocument();
  });

  it('section 선택 타입을 표시한다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="section"
        selectedCount={4}
      />,
    );

    expect(screen.getByText('4개 섹션')).toBeInTheDocument();
  });

  it('text 선택 타입을 표시한다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="text"
        selectedCount={6}
      />,
    );

    expect(screen.getByText('6개 텍스트')).toBeInTheDocument();
  });

  it('mixed 선택 타입을 표시한다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="mixed"
        selectedCount={10}
      />,
    );

    expect(screen.getByText('10개 혼합')).toBeInTheDocument();
  });

  it('non-mixed 선택 시 색상 입력이 표시된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        commonProperties={defaultCommonProperties}
      />,
    );

    expect(screen.getByLabelText('공통 색상')).toBeInTheDocument();
  });

  it('mixed 선택 시 색상 입력이 숨겨진다', () => {
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

  it('color picker로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        commonProperties={defaultCommonProperties}
      />,
    );

    const colorPicker = screen.getByLabelText('공통 색상');
    await user.click(colorPicker);

    expect(colorPicker).toHaveAttribute('type', 'color');
    expect(colorPicker).toHaveValue('#3b82f6'); // 브라우저가 소문자로 정규화
  });

  it('텍스트 입력으로 색상을 변경하면 onBulkUpdate를 호출한다', async () => {
    const user = userEvent.setup();
    const handleBulkUpdate = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        commonProperties={defaultCommonProperties}
        onBulkUpdate={handleBulkUpdate}
      />,
    );

    const inputs = screen.getAllByDisplayValue(/3b82f6/i);
    const textColorInput = inputs.find((input) => input.getAttribute('type') === 'text')!;

    await user.clear(textColorInput);
    await user.type(textColorInput, 'test');

    // userEvent.type()은 각 글자마다 onChange를 호출함
    expect(handleBulkUpdate).toHaveBeenCalled();
    // clear() + type() 모두 onChange를 호출하므로 여러 번 호출됨
    expect(handleBulkUpdate).toHaveBeenCalledTimes(5); // clear + 't', 'e', 's', 't'
  });

  it('node, section, text 선택 시 잠금 버튼이 표시된다', () => {
    const { rerender } = render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByRole('button', { name: '잠금' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '잠금 해제' })).toBeInTheDocument();

    rerender(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="section"
        selectedCount={2}
      />,
    );

    expect(screen.getByRole('button', { name: '잠금' })).toBeInTheDocument();

    rerender(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="text"
        selectedCount={4}
      />,
    );

    expect(screen.getByRole('button', { name: '잠금' })).toBeInTheDocument();
  });

  it('line 선택 시 잠금 버튼이 숨겨진다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="line"
        selectedCount={2}
      />,
    );

    expect(screen.queryByRole('button', { name: '잠금' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '잠금 해제' })).not.toBeInTheDocument();
  });

  it('잠금 버튼 클릭 시 onBulkLock을 호출한다', async () => {
    const user = userEvent.setup();
    const handleBulkLock = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        onBulkLock={handleBulkLock}
      />,
    );

    const lockButton = screen.getByRole('button', { name: '잠금' });
    await user.click(lockButton);

    expect(handleBulkLock).toHaveBeenCalledTimes(1);
  });

  it('잠금 해제 버튼 클릭 시 onBulkUnlock을 호출한다', async () => {
    const user = userEvent.setup();
    const handleBulkUnlock = vi.fn();

    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        onBulkUnlock={handleBulkUnlock}
      />,
    );

    const unlockButton = screen.getByRole('button', { name: '잠금 해제' });
    await user.click(unlockButton);

    expect(handleBulkUnlock).toHaveBeenCalledTimes(1);
  });

  it('복제 버튼 클릭 시 onBulkDuplicate를 호출한다', async () => {
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

    expect(handleBulkDuplicate).toHaveBeenCalledTimes(1);
  });

  it('삭제 버튼 클릭 시 onBulkDelete를 호출한다', async () => {
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

    expect(handleBulkDelete).toHaveBeenCalledTimes(1);
  });

  it('onBulkUpdate가 없으면 색상 입력이 비활성화된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        commonProperties={defaultCommonProperties}
      />,
    );

    const colorPicker = screen.getByLabelText('공통 색상');
    expect(colorPicker).toBeDisabled();
  });

  it('onBulkLock이 없으면 잠금 버튼이 비활성화된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    const lockButton = screen.getByRole('button', { name: '잠금' });
    expect(lockButton).toBeDisabled();
  });

  it('onBulkUnlock이 없으면 잠금 해제 버튼이 비활성화된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    const unlockButton = screen.getByRole('button', { name: '잠금 해제' });
    expect(unlockButton).toBeDisabled();
  });

  it('onBulkDuplicate가 없으면 복제 버튼이 비활성화된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    const duplicateButton = screen.getByRole('button', { name: '복제' });
    expect(duplicateButton).toBeDisabled();
  });

  it('onBulkDelete가 없으면 삭제 버튼이 비활성화된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    expect(deleteButton).toBeDisabled();
  });

  it('삭제 경고 메시지가 표시된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByText('주의: 삭제 작업은 되돌릴 수 없습니다.')).toBeInTheDocument();
  });

  it('색상 변경 안내 메시지가 표시된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    expect(screen.getByText('선택한 모든 요소의 색상을 변경합니다')).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
        className="custom-sidebar"
      />,
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('custom-sidebar');
  });

  it('ScrollArea가 올바르게 렌더링된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={3}
      />,
    );

    const scrollArea = document.querySelector('.h-full');
    expect(scrollArea).toBeInTheDocument();
  });

  it('Badge가 올바르게 렌더링된다', () => {
    render(
      <MultiSelectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        selectionType="node"
        selectedCount={7}
      />,
    );

    const badge = screen.getByText('7개 노드');
    expect(badge).toBeInTheDocument();
  });
});
