import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { TextSidebar } from './index';

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
  Lock: () => <span data-testid="lock-icon" />,
  Minus: () => <span data-testid="minus-icon" />,
  Plus: () => <span data-testid="plus-icon" />,
  Bold: () => <span data-testid="bold-icon" />,
}));

describe('TextSidebar', () => {
  const defaultTextData = {
    content: '테스트 텍스트',
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: '#000000',
    locked: false,
  };

  it('닫혀있을 때 렌더링되지 않는다', () => {
    render(<TextSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('텍스트 편집')).not.toBeInTheDocument();
  });

  it('열려있을 때 렌더링된다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('텍스트 편집')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('textData를 표시한다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    expect(contentTextarea).toHaveValue('테스트 텍스트');

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(16);
  });

  it('textData가 없을 때 기본값을 사용한다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} />);

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    expect(contentTextarea).toHaveValue('');

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(16);
  });

  it('닫기 버튼 클릭 시 onOpenChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(<TextSidebar open={true} onOpenChange={handleOpenChange} />);

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('텍스트 내용을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    await user.clear(contentTextarea);
    await user.type(contentTextarea, '새 텍스트');

    expect(contentTextarea).toHaveValue('새 텍스트');
  });

  it('글자 크기를 직접 입력할 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    await user.clear(fontSizeInput);
    await user.type(fontSizeInput, '24');

    expect(fontSizeInput).toHaveValue(24);
  });

  it('+ 버튼으로 글자 크기를 증가시킬 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const plusButton = screen.getByRole('button', { name: '글자 크기 증가' });
    await user.click(plusButton);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(17);
  });

  it('- 버튼으로 글자 크기를 감소시킬 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const minusButton = screen.getByRole('button', { name: '글자 크기 감소' });
    await user.click(minusButton);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(15);
  });

  it('글자 크기는 최소 8px이다', async () => {
    const user = userEvent.setup();

    render(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={{ ...defaultTextData, fontSize: 8 }}
      />,
    );

    const minusButton = screen.getByRole('button', { name: '글자 크기 감소' });
    await user.click(minusButton);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(8);
  });

  it('글자 크기는 최대 72px이다', async () => {
    const user = userEvent.setup();

    render(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={{ ...defaultTextData, fontSize: 72 }}
      />,
    );

    const plusButton = screen.getByRole('button', { name: '글자 크기 증가' });
    await user.click(plusButton);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(72);
  });

  it('글자 두께 버튼이 렌더링된다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    expect(screen.getByRole('button', { name: '보통' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /굵게/ })).toBeInTheDocument();
  });

  it('글자 두께를 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const boldButton = screen.getByRole('button', { name: /굵게/ });
    await user.click(boldButton);

    // 버튼이 활성 상태로 표시되어야 한다
    expect(boldButton).not.toHaveClass('outline');
  });

  it('글자 두께 상태가 올바르게 표시된다', () => {
    const { rerender } = render(
      <TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />,
    );

    const normalButton = screen.getByRole('button', { name: '보통' });
    const boldButton = screen.getByRole('button', { name: /굵게/ });

    // normal 상태
    expect(normalButton).not.toHaveClass('outline');
    expect(boldButton).toHaveClass('outline');

    // bold 상태로 변경
    rerender(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={{ ...defaultTextData, fontWeight: 'bold' }}
      />,
    );

    expect(normalButton).toHaveClass('outline');
    expect(boldButton).not.toHaveClass('outline');
  });

  it('color picker로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const colorPicker = screen.getByLabelText('글자 색상');
    await user.click(colorPicker);

    expect(colorPicker).toHaveAttribute('type', 'color');
    expect(colorPicker).toHaveValue('#000000');
  });

  it('텍스트 입력으로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const colorInputs = screen.getAllByDisplayValue('#000000');
    const textColorInput = colorInputs[1];

    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    expect(textColorInput).toHaveValue('#ff0000');
  });

  it('lock toggle을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const lockSwitch = screen.getByRole('switch');
    expect(lockSwitch).toHaveAttribute('aria-checked', 'false');

    await user.click(lockSwitch);

    expect(lockSwitch).toHaveAttribute('aria-checked', 'true');
  });

  it('저장 버튼 클릭 시 onSave를 호출한다', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={defaultTextData}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith({
      content: '테스트 텍스트',
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000',
      locked: false,
    });
  });

  it('onSave가 없으면 저장 버튼이 비활성화된다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const saveButton = screen.getByRole('button', { name: '저장' });
    expect(saveButton).toBeDisabled();
  });

  it('textData prop 변경 시 내부 state가 업데이트된다', () => {
    const { rerender } = render(
      <TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />,
    );

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    expect(contentTextarea).toHaveValue('테스트 텍스트');

    rerender(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={{ ...defaultTextData, content: '업데이트된 텍스트' }}
      />,
    );

    expect(contentTextarea).toHaveValue('업데이트된 텍스트');
  });

  it('여러 속성을 변경한 후 저장할 수 있다', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={defaultTextData}
        onSave={handleSave}
      />,
    );

    // 텍스트 내용 변경
    const contentTextarea = screen.getByLabelText('텍스트 내용');
    await user.clear(contentTextarea);
    await user.type(contentTextarea, '변경된 텍스트');

    // 글자 크기 변경
    const plusButton = screen.getByRole('button', { name: '글자 크기 증가' });
    await user.click(plusButton);
    await user.click(plusButton);

    // 글자 두께 변경
    const boldButton = screen.getByRole('button', { name: /굵게/ });
    await user.click(boldButton);

    // 색상 변경
    const colorInputs = screen.getAllByDisplayValue('#000000');
    const textColorInput = colorInputs[1];
    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    // Lock 변경
    const lockSwitch = screen.getByRole('switch');
    await user.click(lockSwitch);

    // 저장
    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      content: '변경된 텍스트',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ff0000',
      locked: true,
    });
  });

  it('lock 설명이 표시된다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    expect(screen.getByText('텍스트를 잠가 수정을 방지합니다')).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={defaultTextData}
        className="custom-sidebar"
      />,
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('custom-sidebar');
  });

  it('ScrollArea가 올바르게 렌더링된다', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const scrollArea = document.querySelector('.h-full');
    expect(scrollArea).toBeInTheDocument();
  });
});
