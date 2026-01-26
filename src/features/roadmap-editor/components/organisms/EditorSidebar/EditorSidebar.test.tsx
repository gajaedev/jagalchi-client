import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { EditorSidebar } from '.';

describe('EditorSidebar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider>
        <EditorSidebar />
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders as aside element', () => {
    const { container } = render(
      <Provider>
        <EditorSidebar />
      </Provider>,
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveClass('w-60');
    expect(aside).toHaveClass('border-l');
  });

  it('renders empty state when nothing is selected', () => {
    render(
      <Provider>
        <EditorSidebar />
      </Provider>,
    );

    expect(screen.getByText(/속성을 보려면/)).toBeInTheDocument();
  });

  it('has correct width class', () => {
    const { container } = render(
      <Provider>
        <EditorSidebar />
      </Provider>,
    );

    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('w-60');
  });

  it('has border on left side', () => {
    const { container } = render(
      <Provider>
        <EditorSidebar />
      </Provider>,
    );

    const aside = container.querySelector('aside');
    expect(aside).toHaveClass('border-l');
  });

  it('is a memo component', () => {
    expect(typeof EditorSidebar).toBe('object');
  });
});
