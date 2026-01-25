import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorPicker } from './index';

describe('ColorPicker', () => {
  it('기본 색상을 올바르게 표시한다', () => {
    const { container } = render(<ColorPicker value="#009689" />);
    const button = container.querySelector('button');
    expect(button).toHaveStyle({ backgroundColor: '#009689' });
  });

  it('색상 변경 시 onChange 핸들러를 호출한다', () => {
    const handleChange = vi.fn();

    const { container } = render(<ColorPicker value="#009689" onChange={handleChange} />);
    const input = container.querySelector('input[type="color"]') as HTMLInputElement;

    // fireEvent를 사용하여 change 이벤트 발생
    fireEvent.change(input, { target: { value: '#155dfc' } });

    expect(handleChange).toHaveBeenCalledWith('#155dfc');
  });

  it('버튼 클릭 시 color picker를 연다', async () => {
    const user = userEvent.setup();

    const { container } = render(<ColorPicker value="#009689" />);
    const button = container.querySelector('button');
    const input = container.querySelector('input[type="color"]');

    const clickSpy = vi.spyOn(input!, 'click');

    await user.click(button!);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('aria-label을 올바르게 설정한다', () => {
    const { container } = render(<ColorPicker value="#009689" />);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('aria-label', '현재 색상: #009689');
  });

  it('Figma 디자인 스타일을 적용한다 (36px 높이, 8px border-radius)', () => {
    const { container } = render(<ColorPicker value="#009689" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('h-[36px]');
    expect(button).toHaveClass('rounded-[8px]');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-slate-200');
    expect(button).toHaveClass('shadow-xs');
  });

  it('flex-1 클래스를 가진다 (가변 너비)', () => {
    const { container } = render(<ColorPicker value="#009689" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('flex-1');
  });

  it('커스텀 className을 적용할 수 있다', () => {
    const { container } = render(<ColorPicker value="#009689" className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('hidden input이 존재한다', () => {
    const { container } = render(<ColorPicker value="#009689" />);
    const input = container.querySelector('input[type="color"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('opacity-0');
  });
});
