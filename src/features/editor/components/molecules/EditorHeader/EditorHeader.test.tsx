import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { EditorHeader } from './index';

describe('EditorHeader', () => {
  it('renders with default title', () => {
    render(<EditorHeader title="Test Roadmap" status="default" />);
    expect(screen.getByText('Test Roadmap')).toBeInTheDocument();
  });

  it('renders with editable title input when onTitleChange is provided', () => {
    render(<EditorHeader title="Test Roadmap" status="default" onTitleChange={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test Roadmap');
  });

  it('calls onTitleChange when title input changes', async () => {
    const user = userEvent.setup();
    const handleTitleChange = vi.fn();

    render(<EditorHeader title="" status="default" onTitleChange={handleTitleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'New Title');

    expect(handleTitleChange).toHaveBeenCalled();
  });

  it('renders back button when onBack is provided', () => {
    render(<EditorHeader title="Test" status="default" onBack={vi.fn()} />);

    expect(screen.getByRole('button', { name: '뒤로 가기' })).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup();
    const handleBack = vi.fn();

    render(<EditorHeader title="Test" status="default" onBack={handleBack} />);

    const backButton = screen.getByRole('button', { name: '뒤로 가기' });
    await user.click(backButton);

    expect(handleBack).toHaveBeenCalledOnce();
  });

  it('displays saved status indicator', () => {
    render(<EditorHeader title="Test" status="saved" />);
    expect(screen.getByText('(저장됨)')).toBeInTheDocument();
  });

  it('displays failed status indicator', () => {
    render(<EditorHeader title="Test" status="failed" />);
    expect(screen.getByText('(저장 실패)')).toBeInTheDocument();
  });

  it('does not display status indicator for default status', () => {
    render(<EditorHeader title="Test" status="default" />);
    expect(screen.queryByText('(저장됨)')).not.toBeInTheDocument();
    expect(screen.queryByText('(저장 실패)')).not.toBeInTheDocument();
  });

  it('status indicators have proper accessibility attributes', () => {
    const { rerender } = render(<EditorHeader title="Test" status="saved" />);

    const savedStatus = screen.getByRole('status');
    expect(savedStatus).toHaveAttribute('aria-live', 'polite');

    rerender(<EditorHeader title="Test" status="failed" />);

    const failedStatus = screen.getByRole('status');
    expect(failedStatus).toHaveAttribute('aria-live', 'polite');
  });
});
