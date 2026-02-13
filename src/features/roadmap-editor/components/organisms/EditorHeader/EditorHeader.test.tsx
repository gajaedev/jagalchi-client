import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, expect, it, vi } from 'vitest';

import { EditorHeader } from '.';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('EditorHeader', () => {
  const renderHeader = () => {
    return render(
      <Provider>
        <EditorHeader />
      </Provider>,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderHeader();
    expect(container).toBeInTheDocument();
  });

  it('renders as a header element', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('HEADER');
  });

  it('renders back button', () => {
    renderHeader();
    const backButton = screen.getByLabelText('뒤로가기');
    expect(backButton).toBeInTheDocument();
  });

  it('renders title text', () => {
    renderHeader();
    const title = screen.getByText('Jagalchi Roadmap');
    expect(title).toBeInTheDocument();
  });

  it('has floating box layout classes', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('absolute');
    expect(header).toHaveClass('top-4');
    expect(header).toHaveClass('left-4');
    expect(header).toHaveClass('rounded-lg');
    expect(header).toHaveClass('shadow-sm');
  });

  it('is a memo component', () => {
    expect(typeof EditorHeader).toBe('object');
  });
});
