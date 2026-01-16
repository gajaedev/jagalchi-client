import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { MultiSelectionSidebar } from './index';

vi.mock('lucide-react', () => ({
  AlignLeft: () => <span data-testid="align-left-icon" />,
  AlignCenterHorizontal: () => <span data-testid="align-center-h-icon" />,
  AlignRight: () => <span data-testid="align-right-icon" />,
  AlignVerticalJustifyStart: () => <span data-testid="align-top-icon" />,
  AlignVerticalJustifyCenter: () => <span data-testid="align-center-v-icon" />,
  AlignVerticalJustifyEnd: () => <span data-testid="align-bottom-icon" />,
  Move: () => <span data-testid="move-icon" />,
  Maximize: () => <span data-testid="maximize-icon" />,
}));

vi.mock('@/features/editor/components/atoms/ColorPicker', () => ({
  ColorPicker: ({ value, onChange }: { value: string; onChange: (color: string) => void }) => (
    <div data-testid="color-picker">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="color-picker-input"
      />
    </div>
  ),
}));

describe('MultiSelectionSidebar', () => {
  it('사이드바가 렌더링된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    expect(screen.getByTestId('multi-selection-sidebar')).toBeInTheDocument();
  });

  it('헤더에 올바른 제목이 표시된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    expect(screen.getByText('>> 노드 다중 선택')).toBeInTheDocument();
  });

  it('선택된 노드 수가 표시된다', () => {
    render(<MultiSelectionSidebar selectedCount={5} />);

    expect(screen.getByText('5개 선택됨')).toBeInTheDocument();
  });

  it('6개의 정렬 버튼이 렌더링된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    expect(screen.getByTestId('align-left')).toBeInTheDocument();
    expect(screen.getByTestId('align-center-h')).toBeInTheDocument();
    expect(screen.getByTestId('align-right')).toBeInTheDocument();
    expect(screen.getByTestId('align-top')).toBeInTheDocument();
    expect(screen.getByTestId('align-center-v')).toBeInTheDocument();
    expect(screen.getByTestId('align-bottom')).toBeInTheDocument();
  });

  it('정렬 버튼 클릭 시 onAlign이 호출된다', async () => {
    const user = userEvent.setup();
    const handleAlign = vi.fn();

    render(<MultiSelectionSidebar selectedCount={3} onAlign={handleAlign} />);

    const leftAlignButton = screen.getByTestId('align-left');
    await user.click(leftAlignButton);

    expect(handleAlign).toHaveBeenCalledTimes(1);
    expect(handleAlign).toHaveBeenCalledWith('left');
  });

  it('간격 섹션이 렌더링된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    expect(screen.getByTestId('spacing-move')).toBeInTheDocument();
    expect(screen.getByTestId('spacing-maximize')).toBeInTheDocument();
    expect(screen.getByTestId('spacing-input')).toBeInTheDocument();
  });

  it('간격 입력 필드가 "Mixed" 상태를 표시한다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    const spacingInput = screen.getByTestId('spacing-input') as HTMLInputElement;
    expect(spacingInput.value).toBe('Mixed');
  });

  it('노드 이름 입력 필드가 렌더링된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    const nameInput = screen.getByTestId('node-name-input') as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe('Mixed');
  });

  it('노드 설명 텍스트영역이 렌더링된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    const descriptionTextarea = screen.getByTestId(
      'node-description-textarea',
    ) as HTMLTextAreaElement;
    expect(descriptionTextarea).toBeInTheDocument();
    expect(descriptionTextarea.value).toBe('Mixed');
  });

  it('ColorPicker 컴포넌트가 렌더링된다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
  });

  it('간격 값 변경 시 onSpacingChange가 호출된다', async () => {
    const user = userEvent.setup();
    const handleSpacingChange = vi.fn();

    render(<MultiSelectionSidebar selectedCount={3} onSpacingChange={handleSpacingChange} />);

    const spacingInput = screen.getByTestId('spacing-input');
    await user.clear(spacingInput);
    await user.type(spacingInput, '10');

    expect(handleSpacingChange).toHaveBeenCalled();
  });

  it('각 정렬 버튼이 올바른 aria-label을 가진다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    expect(screen.getByLabelText('왼쪽 정렬')).toBeInTheDocument();
    expect(screen.getByLabelText('수평 중앙')).toBeInTheDocument();
    expect(screen.getByLabelText('오른쪽 정렬')).toBeInTheDocument();
    expect(screen.getByLabelText('상단 정렬')).toBeInTheDocument();
    expect(screen.getByLabelText('수직 중앙')).toBeInTheDocument();
    expect(screen.getByLabelText('하단 정렬')).toBeInTheDocument();
  });

  it('정렬 버튼들이 2x3 그리드로 배치된다', () => {
    const { container } = render(<MultiSelectionSidebar selectedCount={3} />);

    const gridContainer = container.querySelector('.grid.grid-cols-3');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer?.children.length).toBe(6);
  });

  it('노드 이름 입력 필드에 라벨이 연결되어 있다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    const label = screen.getByText('노드 이름');
    const input = screen.getByTestId('node-name-input');

    expect(label).toHaveAttribute('for', 'node-name');
    expect(input).toHaveAttribute('id', 'node-name');
  });

  it('노드 설명 텍스트영역에 라벨이 연결되어 있다', () => {
    render(<MultiSelectionSidebar selectedCount={3} />);

    const label = screen.getByText('노드 설명');
    const textarea = screen.getByTestId('node-description-textarea');

    expect(label).toHaveAttribute('for', 'node-description');
    expect(textarea).toHaveAttribute('id', 'node-description');
  });

  it('사이드바가 fixed 위치에 렌더링된다', () => {
    const { container } = render(<MultiSelectionSidebar selectedCount={3} />);

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('fixed', 'right-0', 'w-80', 'h-full');
  });
});
