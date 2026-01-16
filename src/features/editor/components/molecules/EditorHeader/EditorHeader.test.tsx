import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { EditorHeader } from './index';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('lucide-react', () => ({
  ChevronLeft: () => <span data-testid="chevron-left-icon" />,
}));

describe('EditorHeader', () => {
  const mockRouter = {
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue(mockRouter);
  });

  it('renders "< Jagalchi Roadmap" text', () => {
    render(<EditorHeader />);
    expect(screen.getByText('Jagalchi Roadmap')).toBeInTheDocument();
  });

  it('renders back button with chevron icon', () => {
    render(<EditorHeader />);
    const button = screen.getByRole('button', { name: '뒤로 가기' });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument();
  });

  it('calls router.back() when back button clicked', async () => {
    const user = userEvent.setup();
    render(<EditorHeader />);

    const button = screen.getByRole('button', { name: '뒤로 가기' });
    await user.click(button);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('has correct styling classes', () => {
    const { container } = render(<EditorHeader />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass('flex', 'items-center', 'gap-2', 'px-4', 'py-3', 'h-14');
  });

  it('button has hover effect class', () => {
    render(<EditorHeader />);
    const button = screen.getByRole('button', { name: '뒤로 가기' });

    expect(button).toHaveClass('hover:underline');
  });
});
