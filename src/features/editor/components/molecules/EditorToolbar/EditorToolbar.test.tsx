import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { EditorToolbar } from './index';

describe('EditorToolbar', () => {
  it('renders all tool buttons', () => {
    render(<EditorToolbar />);

    expect(screen.getByRole('button', { name: '노드' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '선' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '섹션' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '텍스트' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AI' })).toBeInTheDocument();
  });

  it('highlights active tool', () => {
    render(<EditorToolbar activeMode="node" />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    expect(nodeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onModeChange when tool is clicked', async () => {
    const user = userEvent.setup();
    const handleModeChange = vi.fn();

    render(<EditorToolbar onModeChange={handleModeChange} />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    await user.click(nodeButton);

    expect(handleModeChange).toHaveBeenCalledWith('node');
  });

  it('calls onModeChange with correct mode for each tool', async () => {
    const user = userEvent.setup();
    const handleModeChange = vi.fn();

    render(<EditorToolbar onModeChange={handleModeChange} />);

    const lineButton = screen.getByRole('button', { name: '선' });
    await user.click(lineButton);
    expect(handleModeChange).toHaveBeenCalledWith('line');

    const sectionButton = screen.getByRole('button', { name: '섹션' });
    await user.click(sectionButton);
    expect(handleModeChange).toHaveBeenCalledWith('section');

    const textButton = screen.getByRole('button', { name: '텍스트' });
    await user.click(textButton);
    expect(handleModeChange).toHaveBeenCalledWith('text');

    const aiButton = screen.getByRole('button', { name: 'AI' });
    await user.click(aiButton);
    expect(handleModeChange).toHaveBeenCalledWith('ai');
  });

  it('has proper accessibility attributes', () => {
    render(<EditorToolbar />);

    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveAttribute('aria-label', '에디터 도구');
  });

  it('only one tool can be active at a time', () => {
    render(<EditorToolbar activeMode="line" />);

    const nodeButton = screen.getByRole('button', { name: '노드' });
    const lineButton = screen.getByRole('button', { name: '선' });
    const sectionButton = screen.getByRole('button', { name: '섹션' });

    expect(nodeButton).toHaveAttribute('aria-pressed', 'false');
    expect(lineButton).toHaveAttribute('aria-pressed', 'true');
    expect(sectionButton).toHaveAttribute('aria-pressed', 'false');
  });
});
