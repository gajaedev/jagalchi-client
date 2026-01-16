import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AIDialog } from './index';

describe('AIDialog', () => {
  it('renders with generate tab by default', () => {
    render(<AIDialog open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('AI 로드맵 생성')).toBeInTheDocument();
    expect(screen.getByText('생성')).toBeInTheDocument();
    expect(screen.getByText('수정')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('원하는 로드맵을 설명해주세요...')).toBeInTheDocument();
  });

  it('renders with modify tab when initialAction is modify', () => {
    render(<AIDialog open={true} onOpenChange={vi.fn()} initialAction="modify" />);

    expect(screen.getByPlaceholderText('어떻게 수정할지 설명해주세요...')).toBeInTheDocument();
  });

  it('switches between tabs', async () => {
    const user = userEvent.setup();
    render(<AIDialog open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByPlaceholderText('원하는 로드맵을 설명해주세요...')).toBeInTheDocument();

    await user.click(screen.getByText('수정'));

    expect(screen.getByPlaceholderText('어떻게 수정할지 설명해주세요...')).toBeInTheDocument();

    await user.click(screen.getByText('생성'));

    expect(screen.getByPlaceholderText('원하는 로드맵을 설명해주세요...')).toBeInTheDocument();
  });

  it('disables submit button when prompt is empty', () => {
    render(<AIDialog open={true} onOpenChange={vi.fn()} />);

    const button = screen.getByRole('button', { name: '생성하기' });
    expect(button).toBeDisabled();
  });

  it('enables submit button when prompt is not empty', async () => {
    const user = userEvent.setup();
    render(<AIDialog open={true} onOpenChange={vi.fn()} />);

    const textarea = screen.getByPlaceholderText('원하는 로드맵을 설명해주세요...');
    await user.type(textarea, 'Create a React learning roadmap');

    const button = screen.getByRole('button', { name: '생성하기' });
    expect(button).not.toBeDisabled();
  });

  it('shows generating state when submit button is clicked', async () => {
    const user = userEvent.setup();
    render(<AIDialog open={true} onOpenChange={vi.fn()} />);

    const textarea = screen.getByPlaceholderText('원하는 로드맵을 설명해주세요...');
    await user.type(textarea, 'Create a React learning roadmap');

    const button = screen.getByRole('button', { name: '생성하기' });
    await user.click(button);

    expect(screen.getByText('생성 중...')).toBeInTheDocument();
  });

  it('calls onOpenChange when dialog is closed', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<AIDialog open={true} onOpenChange={onOpenChange} />);

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
