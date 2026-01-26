import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { MultiSelectPanel } from '.';

describe('MultiSelectPanel', () => {
  const renderPanel = () => {
    return render(
      <Provider>
        <MultiSelectPanel />
      </Provider>,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderPanel();
    expect(container).toBeInTheDocument();
  });

  it('renders as a div with correct spacing', () => {
    const { container } = renderPanel();
    const panel = container.querySelector('.space-y-4.p-4');
    expect(panel).toBeInTheDocument();
  });

  it('renders header with title', () => {
    renderPanel();
    const title = screen.getByText(/다중 선택/);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
  });

  it('renders lock button', () => {
    const { container } = renderPanel();
    const lockButton = container.querySelector('button[disabled]');
    expect(lockButton).toBeInTheDocument();
  });

  it('renders alignment section with label', () => {
    renderPanel();
    const alignLabel = screen.getByText(/정렬/);
    expect(alignLabel).toBeInTheDocument();
  });

  it('renders 6 alignment buttons', () => {
    renderPanel();
    // Horizontal: left, center, right (3개)
    expect(screen.getByTitle(/왼쪽 정렬/)).toBeInTheDocument();
    expect(screen.getByTitle(/가운데 정렬/)).toBeInTheDocument();
    expect(screen.getByTitle(/오른쪽 정렬/)).toBeInTheDocument();
    // Vertical: top, middle, bottom (3개)
    expect(screen.getByTitle(/위쪽 정렬/)).toBeInTheDocument();
    expect(screen.getByTitle(/중간 정렬/)).toBeInTheDocument();
    expect(screen.getByTitle(/아래쪽 정렬/)).toBeInTheDocument();
  });

  it('renders spacing section with disabled inputs', () => {
    renderPanel();
    const spacingLabel = screen.getByText(/간격/);
    expect(spacingLabel).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Value/);
    expect(input).toBeDisabled();
  });

  it('renders name input with mixed value', () => {
    renderPanel();
    const nameLabel = screen.getByText(/노드 이름/);
    expect(nameLabel).toBeInTheDocument();

    const mixedElements = screen.getAllByDisplayValue('Mixed');
    const nameInput = mixedElements.find((el) => el.tagName === 'INPUT');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toBeDisabled();
  });

  it('renders description textarea with mixed value', () => {
    renderPanel();
    const descLabel = screen.getByText(/노드 설명/);
    expect(descLabel).toBeInTheDocument();

    const mixedElements = screen.getAllByDisplayValue('Mixed');
    const textarea = mixedElements.find((el) => el.tagName === 'TEXTAREA');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toBeDisabled();
  });

  it('renders ColorSelector', () => {
    const { container } = renderPanel();
    // ColorSelector는 색상 preset 버튼들을 렌더링함
    const colorButtons = container.querySelectorAll('button[aria-label*="색상"]');
    expect(colorButtons.length).toBeGreaterThan(0);
  });

  it('is a memo component', () => {
    expect(typeof MultiSelectPanel).toBe('object');
  });
});
