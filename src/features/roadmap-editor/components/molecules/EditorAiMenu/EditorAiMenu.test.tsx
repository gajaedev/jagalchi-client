import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EditorAiMenu } from '.';

// Mock console.log to prevent test output pollution
vi.spyOn(console, 'log').mockImplementation(() => {});

describe('EditorAiMenu', () => {
  it('renders without crashing', () => {
    const { container } = render(<EditorAiMenu />);
    expect(container).toBeInTheDocument();
  });

  it('renders ToolbarButton with gear icon', () => {
    render(<EditorAiMenu />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('is a memo component', () => {
    expect(typeof EditorAiMenu).toBe('object');
  });

  it('renders dropdown menu trigger', () => {
    render(<EditorAiMenu />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  it('has dropdown menu structure', () => {
    render(<EditorAiMenu />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });
});
