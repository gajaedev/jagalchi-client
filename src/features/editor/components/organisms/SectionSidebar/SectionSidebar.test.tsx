import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { SectionSidebar } from './index';

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
  Lock: () => <span data-testid="lock-icon" />,
}));

describe('SectionSidebar', () => {
  const defaultSectionData = {
    title: '테스트 섹션',
    color: '#3B82F6',
    isLocked: false,
  };

  it('닫혀있을 때 렌더링되지 않는다', () => {
    render(<SectionSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('섹션 편집')).not.toBeInTheDocument();
  });

  it('열려있을 때 렌더링된다', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('섹션 편집')).toBeInTheDocument();
    expect(screen.getByText('Section')).toBeInTheDocument();
  });

  it('sectionData를 표시한다', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const titleInput = screen.getByLabelText('섹션 제목');
    expect(titleInput).toHaveValue('테스트 섹션');
  });

  it('sectionData가 없을 때 기본값을 사용한다', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} />);

    const titleInput = screen.getByLabelText('섹션 제목');
    expect(titleInput).toHaveValue('');
  });

  it('닫기 버튼 클릭 시 onOpenChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(<SectionSidebar open={true} onOpenChange={handleOpenChange} />);

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('title을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const titleInput = screen.getByLabelText('섹션 제목');
    await user.clear(titleInput);
    await user.type(titleInput, '새 섹션');

    expect(titleInput).toHaveValue('새 섹션');
  });

  it('color picker로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const colorPicker = screen.getByLabelText('섹션 색상');
    await user.click(colorPicker);

    expect(colorPicker).toHaveAttribute('type', 'color');
    expect(colorPicker).toHaveValue('#3b82f6'); // 브라우저가 소문자로 정규화
  });

  it('텍스트 입력으로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const inputs = screen.getAllByDisplayValue(/3b82f6/i);
    const textColorInput = inputs.find((input) => input.getAttribute('type') === 'text')!;

    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    expect(textColorInput).toHaveValue('#ff0000');
  });

  it('lock toggle을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const lockSwitch = screen.getByRole('switch');
    expect(lockSwitch).toHaveAttribute('aria-checked', 'false');

    await user.click(lockSwitch);

    expect(lockSwitch).toHaveAttribute('aria-checked', 'true');
  });

  it('저장 버튼 클릭 시 onSave를 호출한다', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <SectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        sectionData={defaultSectionData}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith({
      title: '테스트 섹션',
      color: '#3B82F6',
      isLocked: false,
    });
  });

  it('onSave가 없으면 저장 버튼이 비활성화된다', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const saveButton = screen.getByRole('button', { name: '저장' });
    expect(saveButton).toBeDisabled();
  });

  it('sectionData prop 변경 시 내부 state가 업데이트된다', () => {
    const { rerender } = render(
      <SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />,
    );

    const titleInput = screen.getByLabelText('섹션 제목');
    expect(titleInput).toHaveValue('테스트 섹션');

    rerender(
      <SectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        sectionData={{ ...defaultSectionData, title: '업데이트된 섹션' }}
      />,
    );

    expect(titleInput).toHaveValue('업데이트된 섹션');
  });

  it('여러 속성을 변경한 후 저장할 수 있다', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <SectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        sectionData={defaultSectionData}
        onSave={handleSave}
      />,
    );

    // Title 변경
    const titleInput = screen.getByLabelText('섹션 제목');
    await user.clear(titleInput);
    await user.type(titleInput, '변경된 섹션');

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
      title: '변경된 섹션',
      color: '#ff0000',
      isLocked: true,
    });
  });

  it('lock 설명이 표시된다', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    expect(screen.getByText('섹션을 잠가 수정을 방지합니다')).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <SectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        sectionData={defaultSectionData}
        className="custom-sidebar"
      />,
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('custom-sidebar');
  });

  it('ScrollArea가 올바르게 렌더링된다', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const scrollArea = document.querySelector('.h-full');
    expect(scrollArea).toBeInTheDocument();
  });
});
