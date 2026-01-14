import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ContributorItem } from './index';

// Mock shadcn/ui Avatar components
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: any) => <div data-testid="avatar">{children}</div>,
  AvatarImage: ({ src, alt }: any) => <img src={src} alt={alt} data-testid="avatar-image" />,
  AvatarFallback: ({ children }: any) => <div data-testid="avatar-fallback">{children}</div>,
}));

describe('ContributorItem', () => {
  it('renders the name correctly', () => {
    render(<ContributorItem name="John Doe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Contributor')).toBeInTheDocument();
  });

  it('renders the fallback text when no avatarUrl is provided', () => {
    render(<ContributorItem name="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders the avatar image when avatarUrl is provided', () => {
    render(<ContributorItem name="John Doe" avatarUrl="https://example.com/avatar.png" />);
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.png');
  });
});
