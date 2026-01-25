import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EditorDivider } from './index';

describe('EditorDivider', () => {
  it('수평 구분선을 렌더링한다', () => {
    const { container } = render(<EditorDivider orientation="horizontal" />);
    const divider = container.querySelector('div');
    expect(divider).toHaveClass('h-px');
    expect(divider).toHaveClass('w-full');
  });

  it('수직 구분선을 렌더링한다', () => {
    const { container } = render(<EditorDivider orientation="vertical" />);
    const divider = container.querySelector('div');
    expect(divider).toHaveClass('h-full');
    expect(divider).toHaveClass('w-px');
  });

  it('기본값은 수평이다', () => {
    const { container } = render(<EditorDivider />);
    const divider = container.querySelector('div');
    expect(divider).toHaveClass('h-px');
    expect(divider).toHaveClass('w-full');
  });

  it('role="separator"를 가진다', () => {
    const { container } = render(<EditorDivider />);
    const divider = container.querySelector('div');
    expect(divider).toHaveAttribute('role', 'separator');
  });

  it('aria-orientation을 올바르게 설정한다', () => {
    const { container: horizontalContainer } = render(<EditorDivider orientation="horizontal" />);
    const horizontalDivider = horizontalContainer.querySelector('div');
    expect(horizontalDivider).toHaveAttribute('aria-orientation', 'horizontal');

    const { container: verticalContainer } = render(<EditorDivider orientation="vertical" />);
    const verticalDivider = verticalContainer.querySelector('div');
    expect(verticalDivider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('커스텀 className을 적용할 수 있다', () => {
    const { container } = render(<EditorDivider className="custom-class" />);
    const divider = container.querySelector('div');
    expect(divider).toHaveClass('custom-class');
  });

  it('bg-slate-200 색상을 가진다', () => {
    const { container } = render(<EditorDivider />);
    const divider = container.querySelector('div');
    expect(divider).toHaveClass('bg-slate-200');
  });
});
