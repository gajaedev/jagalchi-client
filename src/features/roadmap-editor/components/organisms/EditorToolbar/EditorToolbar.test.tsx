import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { EditorToolbar } from '.';

describe('EditorToolbar', () => {
  const renderToolbar = () => {
    return render(
      <Provider>
        <ReactFlowProvider>
          <EditorToolbar />
        </ReactFlowProvider>
      </Provider>,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderToolbar();
    expect(container).toBeInTheDocument();
  });

  it('renders as a div with correct classes', () => {
    const { container } = renderToolbar();
    const toolbar = container.querySelector('.fixed.bottom-8');
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveClass('z-50');
  });

  it('renders node button', () => {
    renderToolbar();
    const nodeButton = screen.getByLabelText(/노드/);
    expect(nodeButton).toBeInTheDocument();
  });

  it('renders line button', () => {
    renderToolbar();
    const lineButton = screen.getByLabelText(/선 추가/);
    expect(lineButton).toBeInTheDocument();
  });

  it('renders section button', () => {
    renderToolbar();
    const sectionButton = screen.getByLabelText(/섹션/);
    expect(sectionButton).toBeInTheDocument();
  });

  it('renders text button', () => {
    renderToolbar();
    const textButton = screen.getByLabelText(/텍스트/);
    expect(textButton).toBeInTheDocument();
  });

  it('renders EditorAiMenu', () => {
    renderToolbar();
    const aiMenuButton = screen.getByLabelText(/설정/);
    expect(aiMenuButton).toBeInTheDocument();
  });

  it('has divider between tool buttons and AI menu', () => {
    const { container } = renderToolbar();
    const divider = container.querySelector('.w-px');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('h-6');
  });

  it('is fixed at bottom center', () => {
    const { container } = renderToolbar();
    const toolbar = container.querySelector('.fixed');
    expect(toolbar).toHaveClass('bottom-8');
    expect(toolbar).toHaveClass('left-1/2');
    expect(toolbar).toHaveClass('-translate-x-1/2');
  });

  it('is a memo component', () => {
    expect(typeof EditorToolbar).toBe('object');
  });
});
