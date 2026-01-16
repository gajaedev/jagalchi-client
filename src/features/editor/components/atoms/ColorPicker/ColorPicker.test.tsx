import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ColorPicker } from './index';

describe('ColorPicker', () => {
  it('renders preset colors', () => {
    render(<ColorPicker value="#000000" onChange={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);
  });

  it('calls onChange when preset color clicked', () => {
    const onChange = vi.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);

    const blueButton = screen.getByLabelText('Select color #3B82F6');
    fireEvent.click(blueButton);

    expect(onChange).toHaveBeenCalledWith('#3B82F6');
  });

  it('renders HexColorPicker from react-colorful', () => {
    const { container } = render(<ColorPicker value="#000000" onChange={vi.fn()} />);

    expect(container.querySelector('.react-colorful')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ColorPicker value="#000000" onChange={vi.fn()} className="custom-class" />,
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('uses custom preset colors when provided', () => {
    const customColors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
    render(<ColorPicker value="#FF6B6B" onChange={vi.fn()} presetColors={customColors} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });

  it('highlights selected preset color', () => {
    render(<ColorPicker value="#3B82F6" onChange={vi.fn()} />);

    const blueButton = screen.getByLabelText('Select color #3B82F6');
    expect(blueButton).toHaveClass('ring-2', 'ring-primary', 'ring-offset-2');
  });
});
