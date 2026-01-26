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

  it('renders title input', () => {
    renderHeader();
    const titleInput = screen.getByLabelText('로드맵 제목');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute('placeholder', 'Jagalchi Roadmap');
  });

  it('renders undo button', () => {
    renderHeader();
    const undoButton = screen.getByLabelText(/실행 취소/);
    expect(undoButton).toBeInTheDocument();
  });

  it('renders redo button', () => {
    renderHeader();
    const redoButton = screen.getByLabelText(/다시 실행/);
    expect(redoButton).toBeInTheDocument();
  });

  it('undo button is disabled by default', () => {
    renderHeader();
    const undoButton = screen.getByLabelText(/실행 취소/);
    expect(undoButton).toBeDisabled();
  });

  it('redo button is disabled by default', () => {
    renderHeader();
    const redoButton = screen.getByLabelText(/다시 실행/);
    expect(redoButton).toBeDisabled();
  });

  it('has correct layout classes', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('h-14');
    expect(header).toHaveClass('border-b');
  });

  it('is a memo component', () => {
    expect(typeof EditorHeader).toBe('object');
  });
});
