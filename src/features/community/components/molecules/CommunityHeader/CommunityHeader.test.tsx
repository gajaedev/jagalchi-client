import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
}));

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: any) => <div data-testid="avatar">{children}</div>,
  AvatarImage: ({ src, alt }: any) => <img src={src} alt={alt} data-testid="avatar-image" />,
  AvatarFallback: ({ children }: any) => <div data-testid="avatar-fallback">{children}</div>,
}));

import { CommunityHeader } from './index';

describe('CommunityHeader', () => {
  it('renders user name and avatar', () => {
    render(<CommunityHeader />);

    expect(screen.getByText('UserName')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders back button with correct aria-label', () => {
    render(<CommunityHeader />);

    const backButton = screen.getByRole('button', { name: '뒤로가기' });
    expect(backButton).toBeInTheDocument();
  });

  it('calls router.back when back button is clicked', async () => {
    const user = userEvent.setup();
    render(<CommunityHeader />);

    await user.click(screen.getByRole('button', { name: '뒤로가기' }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('applies additional className when provided', () => {
    const { container } = render(<CommunityHeader className="test-class" />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('test-class');
  });

  it('renders avatar fallback character', () => {
    render(<CommunityHeader />);

    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('U');
  });
});
