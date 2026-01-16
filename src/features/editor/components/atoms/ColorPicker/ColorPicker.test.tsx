import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { ColorPicker } from './index';

describe('ColorPicker', () => {
  it('기본 5개 프리셋 색상이 렌더링된다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const colorButtons = screen.getAllByRole('button', { name: /Select #/ });
    expect(colorButtons).toHaveLength(5); // 5 preset colors
  });

  it('커스텀 프리셋 색상이 렌더링된다', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    const handleChange = vi.fn();

    render(<ColorPicker value="#FF0000" onChange={handleChange} presetColors={customColors} />);

    const colorButtons = screen.getAllByRole('button', { name: /Select #/ });
    expect(colorButtons).toHaveLength(3); // 3 preset colors
  });

  it('프리셋 색상 클릭 시 onChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const blueButton = screen.getByRole('button', { name: 'Select #3B82F6' });
    await user.click(blueButton);

    expect(handleChange).toHaveBeenCalledWith('#3B82F6');
  });

  it('선택된 색상에 ring 스타일이 적용된다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#3B82F6" onChange={handleChange} />);

    const blueButton = screen.getByRole('button', { name: 'Select #3B82F6' });
    expect(blueButton).toHaveClass('ring-2');
  });

  it('HEX input에 현재 값이 표시된다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#3B82F6" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    expect(hexInput).toHaveValue('#3B82F6');
  });

  it('유효한 HEX 입력 시 onChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    await user.clear(hexInput);
    await user.type(hexInput, '#FF5733');

    expect(handleChange).toHaveBeenCalledWith('#FF5733');
  });

  it('유효하지 않은 HEX 입력 시 onChange를 호출하지 않는다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    handleChange.mockClear(); // Clear initial calls

    await user.clear(hexInput);
    await user.type(hexInput, 'invalid');

    // onChange should not be called for invalid HEX
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('3자리 HEX 코드를 허용한다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    await user.clear(hexInput);
    await user.type(hexInput, '#FFF');

    expect(handleChange).toHaveBeenCalledWith('#FFF');
  });

  it('유효하지 않은 입력 후 blur 시 이전 값으로 되돌린다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    await user.clear(hexInput);
    await user.type(hexInput, 'invalid');
    await user.tab(); // Blur

    expect(hexInput).toHaveValue('#000000');
  });

  it('color picker 버튼을 렌더링한다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const pickerButton = screen.getByRole('button', {
      name: 'Open color picker',
    });
    expect(pickerButton).toBeInTheDocument();
  });

  it('커스텀 className이 적용된다', () => {
    const handleChange = vi.fn();
    const { container } = render(
      <ColorPicker value="#000000" onChange={handleChange} className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('HEX input이 대문자로 표시된다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#3b82f6" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    expect(hexInput).toHaveClass('uppercase');
  });

  it('HEX input이 monospace 폰트를 사용한다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6');
    expect(hexInput).toHaveClass('font-mono');
  });

  it('HEX input의 최대 길이가 7자이다', () => {
    const handleChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={handleChange} />);

    const hexInput = screen.getByPlaceholderText('#3B82F6') as HTMLInputElement;
    expect(hexInput.maxLength).toBe(7);
  });
});
