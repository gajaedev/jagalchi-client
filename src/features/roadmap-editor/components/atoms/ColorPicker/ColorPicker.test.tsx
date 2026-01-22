import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorPicker } from './index';

describe('ColorPicker', () => {
  const mockOnChange = vi.fn();

  it('레이블과 함께 렌더링된다', () => {
    render(<ColorPicker label="Pick Color" value="#3b82f6" onChange={mockOnChange} />);

    expect(screen.getByText('Pick Color')).toBeInTheDocument();
  });

  it('현재 색상 값을 표시한다', () => {
    render(<ColorPicker value="#3b82f6" onChange={mockOnChange} />);

    expect(screen.getByText('#3b82f6')).toBeInTheDocument();
  });

  it('버튼 클릭 시 popover를 연다', async () => {
    const user = userEvent.setup();

    render(<ColorPicker value="#3b82f6" onChange={mockOnChange} />);

    const button = screen.getByLabelText('Pick a color');
    await user.click(button);

    expect(screen.getByText('Custom Color')).toBeInTheDocument();
  });

  it('recent colors를 표시한다', async () => {
    const user = userEvent.setup();
    const recentColors = ['#ef4444', '#10b981'];

    render(<ColorPicker value="#3b82f6" onChange={mockOnChange} recentColors={recentColors} />);

    const button = screen.getByLabelText('Pick a color');
    await user.click(button);

    expect(screen.getByText('Recent Colors')).toBeInTheDocument();
  });

  it('색상 변경 시 onChange 핸들러를 호출한다', async () => {
    const user = userEvent.setup();

    render(<ColorPicker value="#3b82f6" onChange={mockOnChange} />);

    const button = screen.getByLabelText('Pick a color');
    await user.click(button);

    // Click on a preset color button
    const redColorButton = screen.getByLabelText('Select color #ef4444');
    await user.click(redColorButton);

    expect(mockOnChange).toHaveBeenCalledWith('#ef4444');
  });
});
