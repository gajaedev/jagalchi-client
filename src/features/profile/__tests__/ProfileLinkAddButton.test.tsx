import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ProfileLinkAddButton } from '../components/atoms/ProfileLinkAddButton';

describe('ProfileLinkAddButton', () => {
  it('renders correctly with default props', () => {
    render(<ProfileLinkAddButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('링크추가(0/5)');
    expect(button).not.toBeDisabled();
  });

  it('renders correctly with custom counts', () => {
    render(<ProfileLinkAddButton currentCount={2} maxCount={5} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('링크추가(2/5)');
  });

  it('is disabled when limit is reached', () => {
    render(<ProfileLinkAddButton currentCount={5} maxCount={5} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<ProfileLinkAddButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<ProfileLinkAddButton currentCount={5} maxCount={5} onClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
