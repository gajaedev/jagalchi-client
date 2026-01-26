import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EditorToolbar } from './index';

describe('EditorToolbar', () => {
  const mockTools = [
    {
      id: 'select',
      icon: <span>Select</span>,
      label: 'Select tool',
      isActive: true,
    },
    {
      id: 'move',
      icon: <span>Move</span>,
      label: 'Move tool',
      isActive: false,
    },
  ];

  it('56px 너비로 렌더링된다', () => {
    const { container } = render(<EditorToolbar tools={mockTools} />);
    const toolbar = container.firstChild as HTMLElement;

    expect(toolbar.className).toContain('w-14');
  });

  it('toolbar role을 가진다', () => {
    render(<EditorToolbar tools={mockTools} />);

    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('툴 버튼들을 렌더링한다', () => {
    render(<EditorToolbar tools={mockTools} />);

    expect(screen.getByLabelText('Select tool')).toBeInTheDocument();
    expect(screen.getByLabelText('Move tool')).toBeInTheDocument();
  });

  it('divider를 렌더링한다', () => {
    const toolsWithDivider = [
      mockTools[0],
      {
        id: 'divider',
        icon: null,
        label: '',
      },
      mockTools[1],
    ];

    const { container } = render(<EditorToolbar tools={toolsWithDivider} />);
    const divider = container.querySelector('[role="separator"]');

    expect(divider).toBeInTheDocument();
  });

  it('neutral-200 border를 적용한다', () => {
    const { container } = render(<EditorToolbar tools={mockTools} />);
    const toolbar = container.firstChild as HTMLElement;

    expect(toolbar.className).toContain('border-neutral-200');
  });

  it('neutral-0 배경을 적용한다', () => {
    const { container } = render(<EditorToolbar tools={mockTools} />);
    const toolbar = container.firstChild as HTMLElement;

    expect(toolbar.className).toContain('bg-neutral-0');
  });

  it('올바른 간격(gap-2)을 적용한다', () => {
    const { container } = render(<EditorToolbar tools={mockTools} />);
    const toolbar = container.firstChild as HTMLElement;

    expect(toolbar.className).toContain('gap-2');
  });
});
