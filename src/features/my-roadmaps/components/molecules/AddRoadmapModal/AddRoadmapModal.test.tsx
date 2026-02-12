import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddRoadmapModal } from './AddRoadmapModal';

describe('AddRoadmapModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<AddRoadmapModal {...defaultProps} />);
    expect(screen.getByText('로드맵 추가')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('로드맵 이름을 입력하세요')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AddRoadmapModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('로드맵 추가')).not.toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<AddRoadmapModal {...defaultProps} />);
    const input = screen.getByPlaceholderText('로드맵 이름을 입력하세요') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Roadmap' } });
    expect(input.value).toBe('New Roadmap');
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<AddRoadmapModal {...defaultProps} />);
    fireEvent.click(screen.getByText('취소'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm with input value when confirm button is clicked', () => {
    render(<AddRoadmapModal {...defaultProps} />);
    const input = screen.getByPlaceholderText('로드맵 이름을 입력하세요');
    fireEvent.change(input, { target: { value: 'Test Roadmap' } });
    fireEvent.click(screen.getByText('확인'));
    expect(defaultProps.onConfirm).toHaveBeenCalledWith('Test Roadmap', null);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('opens SelectLocationModal when "자세히 설정하기" is clicked', () => {
    render(<AddRoadmapModal {...defaultProps} />);

    // Initially, SelectLocationModal content should not be visible
    expect(screen.queryByText('위치선택')).not.toBeInTheDocument();

    // Click "자세히 설정하기"
    fireEvent.click(screen.getByText('자세히 설정하기'));

    // Now, SelectLocationModal content should be visible
    expect(screen.getByText('위치선택')).toBeInTheDocument();
  });
});
