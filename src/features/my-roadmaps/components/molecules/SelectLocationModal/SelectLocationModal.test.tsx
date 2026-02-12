import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { SelectLocationModal } from './SelectLocationModal';

describe('SelectLocationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<SelectLocationModal {...defaultProps} />);

    expect(screen.getByText('위치선택')).toBeDefined();
    expect(screen.getByPlaceholderText('Search')).toBeDefined();
    expect(screen.getByText('Root')).toBeDefined();
    expect(screen.getByText("User's Team")).toBeDefined();
    expect(screen.getAllByText('Directory')).toHaveLength(3);
    expect(screen.getByRole('button', { name: '취소' })).toBeDefined();
    expect(screen.getByRole('button', { name: '확인' })).toBeDefined();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<SelectLocationModal {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<SelectLocationModal {...defaultProps} />);

    // Select an item first to enable the confirm button
    fireEvent.click(screen.getByText("User's Team"));
    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(defaultProps.onConfirm).toHaveBeenCalledWith('team-1');
  });

  it('updates search query on input change', () => {
    render(<SelectLocationModal {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });

  it('does not render when isOpen is false', () => {
    const { queryByText } = render(<SelectLocationModal {...defaultProps} isOpen={false} />);
    expect(queryByText('위치선택')).toBeNull();
  });
});
