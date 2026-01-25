import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CollapseSection } from './index';

describe('CollapseSection', () => {
  it('제목과 내용을 렌더링한다', () => {
    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('제목에 올바른 스타일이 적용된다', () => {
    render(
      <CollapseSection title="Test Section">
        <div>Test Content</div>
      </CollapseSection>,
    );

    const title = screen.getByText('Test Section');
    expect(title).toHaveClass('text-sm', 'font-medium', 'text-slate-900');
  });

  it('여러 자식 요소를 렌더링한다', () => {
    render(
      <CollapseSection title="Resources">
        <div>Resource 1</div>
        <div>Resource 2</div>
        <div>Resource 3</div>
      </CollapseSection>,
    );

    expect(screen.getByText('Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Resource 2')).toBeInTheDocument();
    expect(screen.getByText('Resource 3')).toBeInTheDocument();
  });

  it('커스텀 className을 적용한다', () => {
    const { container } = render(
      <CollapseSection title="Test Section" className="custom-class">
        <div>Test Content</div>
      </CollapseSection>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });
});
