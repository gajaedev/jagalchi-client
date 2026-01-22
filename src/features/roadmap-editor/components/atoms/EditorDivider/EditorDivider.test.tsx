import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EditorDivider } from './index';

describe('EditorDivider', () => {
  it('기본적으로 horizontal divider를 렌더링한다', () => {
    const { container } = render(<EditorDivider />);
    const divider = container.firstChild as HTMLElement;

    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider.className).toContain('h-px');
    expect(divider.className).toContain('w-full');
  });

  it('vertical orientation을 렌더링한다', () => {
    const { container } = render(<EditorDivider orientation="vertical" />);
    const divider = container.firstChild as HTMLElement;

    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(divider.className).toContain('w-px');
    expect(divider.className).toContain('h-full');
  });

  it('neutral-200 배경색을 적용한다', () => {
    const { container } = render(<EditorDivider />);
    const divider = container.firstChild as HTMLElement;

    expect(divider.className).toContain('bg-neutral-200');
  });

  it('커스텀 className을 적용한다', () => {
    const { container } = render(<EditorDivider className="custom-class" />);
    const divider = container.firstChild as HTMLElement;

    expect(divider.className).toContain('custom-class');
  });

  it('aria-label을 설정한다', () => {
    const { container } = render(<EditorDivider aria-label="Section divider" />);
    const divider = container.firstChild as HTMLElement;

    expect(divider).toHaveAttribute('aria-label', 'Section divider');
  });

  it('horizontal divider는 12px vertical margin을 가진다', () => {
    const { container } = render(<EditorDivider orientation="horizontal" />);
    const divider = container.firstChild as HTMLElement;

    expect(divider.className).toContain('my-[var(--spacing-divider-vertical)]');
  });

  it('vertical divider는 12px horizontal margin을 가진다', () => {
    const { container } = render(<EditorDivider orientation="vertical" />);
    const divider = container.firstChild as HTMLElement;

    expect(divider.className).toContain('mx-[var(--spacing-divider-horizontal)]');
  });
});
