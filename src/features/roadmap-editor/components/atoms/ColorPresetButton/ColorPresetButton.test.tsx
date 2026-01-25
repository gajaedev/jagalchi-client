import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorPresetButton } from './index';

describe('ColorPresetButton', () => {
  it('컬러를 올바르게 표시한다', () => {
    const { container } = render(<ColorPresetButton color="#155dfc" />);
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ backgroundColor: '#155dfc' });
  });

  it('클릭 시 onClick 핸들러를 호출한다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ColorPresetButton color="#155dfc" onClick={handleClick} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('isSelected=true일 때 선택 스타일을 적용한다', () => {
    render(<ColorPresetButton color="#155dfc" isSelected />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ring-2');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('isSelected=false일 때 선택 스타일을 적용하지 않는다', () => {
    render(<ColorPresetButton color="#155dfc" isSelected={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('aria-label을 올바르게 설정한다', () => {
    render(<ColorPresetButton color="#155dfc" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '색상: #155dfc');
  });

  it('Figma 디자인 스타일을 적용한다 (36px 높이, 8px border-radius)', () => {
    render(<ColorPresetButton color="#155dfc" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-[36px]');
    expect(button).toHaveClass('rounded-[8px]');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-slate-200');
    expect(button).toHaveClass('shadow-sm');
  });

  it('고정 너비를 가진다 (36px x 36px 정사각형)', () => {
    render(<ColorPresetButton color="#155dfc" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-[36px]');
    expect(button).toHaveClass('min-w-[36px]');
  });

  it('disabled 상태일 때 클릭이 동작하지 않는다', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { container } = render(<ColorPresetButton color="#155dfc" onClick={handleClick} />);
    const button = container.querySelector('button');

    // disabled 속성 추가
    button?.setAttribute('disabled', 'true');

    await user.click(button!);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('커스텀 className을 적용할 수 있다', () => {
    render(<ColorPresetButton color="#155dfc" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
