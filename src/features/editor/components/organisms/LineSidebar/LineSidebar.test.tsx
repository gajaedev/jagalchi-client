import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { LineSidebar } from './index';

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
}));

describe('LineSidebar', () => {
  const defaultLineData = {
    style: 'solid' as const,
    color: '#000000',
    label: '테스트 선',
  };

  it('닫혀있을 때 렌더링되지 않는다', () => {
    render(<LineSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('선 편집')).not.toBeInTheDocument();
  });

  it('열려있을 때 렌더링된다', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('선 편집')).toBeInTheDocument();
    expect(screen.getByText('Line')).toBeInTheDocument();
  });

  it('lineData를 표시한다', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    expect(labelInput).toHaveValue('테스트 선');
  });

  it('lineData가 없을 때 기본값을 사용한다', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} />);

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    expect(labelInput).toHaveValue('');
  });

  it('닫기 버튼 클릭 시 onOpenChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(<LineSidebar open={true} onOpenChange={handleOpenChange} />);

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('모든 선 스타일 옵션이 렌더링된다', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: '실선' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '점선' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '점선 (작은)' })).toBeInTheDocument();
  });

  it('선 스타일을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const dashedButton = screen.getByRole('button', { name: '점선' });
    await user.click(dashedButton);

    // 버튼이 활성 상태로 표시되어야 한다
    expect(dashedButton).not.toHaveClass('outline');
  });

  it('각 선 스타일을 순서대로 선택할 수 있다', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const solidButton = screen.getByRole('button', { name: '실선' });
    const dashedButton = screen.getByRole('button', { name: '점선' });
    const dottedButton = screen.getByRole('button', { name: '점선 (작은)' });

    // solid 선택
    await user.click(solidButton);
    expect(solidButton).not.toHaveClass('outline');

    // dashed 선택
    await user.click(dashedButton);
    expect(dashedButton).not.toHaveClass('outline');

    // dotted 선택
    await user.click(dottedButton);
    expect(dottedButton).not.toHaveClass('outline');
  });

  it('color picker로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const colorPicker = screen.getByLabelText('선 색상');
    await user.click(colorPicker);

    // color input type은 값 설정이 가능해야 한다
    expect(colorPicker).toHaveAttribute('type', 'color');
    expect(colorPicker).toHaveValue('#000000');
  });

  it('텍스트 입력으로 색상을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const inputs = screen.getAllByDisplayValue(/#000000/i);
    const textColorInput = inputs.find((input) => input.getAttribute('type') === 'text')!;

    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    expect(textColorInput).toHaveValue('#ff0000');
  });

  it('라벨을 변경할 수 있다', async () => {
    const user = userEvent.setup();

    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    await user.clear(labelInput);
    await user.type(labelInput, '새 라벨');

    expect(labelInput).toHaveValue('새 라벨');
  });

  it('저장 버튼 클릭 시 onSave를 호출한다', async () => {
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

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith({
      style: 'solid',
      color: '#000000',
      label: '테스트 선',
    });
  });

  it('빈 라벨은 undefined로 저장된다', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <LineSidebar
        open={true}
        onOpenChange={vi.fn()}
        lineData={{ ...defaultLineData, label: '' }}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      style: 'solid',
      color: '#000000',
      label: undefined,
    });
  });

  it('onSave가 없으면 저장 버튼이 비활성화된다', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    const saveButton = screen.getByRole('button', { name: '저장' });
    expect(saveButton).toBeDisabled();
  });

  it('lineData prop 변경 시 내부 state가 업데이트된다', () => {
    const { rerender } = render(
      <LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />,
    );

    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    expect(labelInput).toHaveValue('테스트 선');

    rerender(
      <LineSidebar
        open={true}
        onOpenChange={vi.fn()}
        lineData={{ ...defaultLineData, label: '업데이트된 라벨' }}
      />,
    );

    expect(labelInput).toHaveValue('업데이트된 라벨');
  });

  it('여러 속성을 변경한 후 저장할 수 있다', async () => {
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

    // 스타일 변경
    const dashedButton = screen.getByRole('button', { name: '점선' });
    await user.click(dashedButton);

    // 색상 변경
    const inputs = screen.getAllByDisplayValue(/#000000/i);
    const textColorInput = inputs.find((input) => input.getAttribute('type') === 'text')!;
    await user.clear(textColorInput);
    await user.type(textColorInput, '#ff0000');

    // 라벨 변경
    const labelInput = screen.getByLabelText('선 라벨 (선택)');
    await user.clear(labelInput);
    await user.type(labelInput, '변경된 라벨');

    // 저장
    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      style: 'dashed',
      color: '#ff0000',
      label: '변경된 라벨',
    });
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <LineSidebar
        open={true}
        onOpenChange={vi.fn()}
        lineData={defaultLineData}
        className="custom-sidebar"
      />,
    );

    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('custom-sidebar');
  });

  it('ScrollArea가 올바르게 렌더링된다', () => {
    render(<LineSidebar open={true} onOpenChange={vi.fn()} lineData={defaultLineData} />);

    // ScrollArea는 h-full 클래스를 가져야 한다
    const scrollArea = document.querySelector('.h-full');
    expect(scrollArea).toBeInTheDocument();
  });
});
