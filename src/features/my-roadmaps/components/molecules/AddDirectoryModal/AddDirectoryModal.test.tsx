import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AddDirectoryModal } from './AddDirectoryModal';

describe('AddDirectoryModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  it('renders correctly when open', () => {
    render(<AddDirectoryModal {...defaultProps} />);
    expect(screen.getByText('디렉토리 추가')).toBeInTheDocument();
    expect(screen.getByText('아이콘 추가')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('디렉토리 이름을 입력하세요')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AddDirectoryModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('디렉토리 추가')).not.toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<AddDirectoryModal {...defaultProps} />);
    const input = screen.getByPlaceholderText('디렉토리 이름을 입력하세요') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Directory' } });
    expect(input.value).toBe('New Directory');
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<AddDirectoryModal {...defaultProps} />);
    fireEvent.click(screen.getByText('취소'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm with input value when confirm button is clicked', () => {
    render(<AddDirectoryModal {...defaultProps} />);
    const input = screen.getByPlaceholderText('디렉토리 이름을 입력하세요');
    fireEvent.change(input, { target: { value: 'Test Directory' } });
    fireEvent.click(screen.getByText('확인'));
    expect(defaultProps.onConfirm).toHaveBeenCalledWith('Test Directory');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
