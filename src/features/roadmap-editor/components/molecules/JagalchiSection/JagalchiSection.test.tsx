import { render } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { JagalchiSection } from '.';

import type { JagalchiSectionData } from '../../../types/editor.types';

describe('JagalchiSection', () => {
  const mockData: JagalchiSectionData = {
    title: 'Test Section',
    variant: 'white',
    isLocked: false,
  };

  const renderSection = (data: JagalchiSectionData = mockData, selected = false) => {
    return render(
      <Provider>
        <ReactFlowProvider>
          <JagalchiSection id="Section_1" data={data} selected={selected} />
        </ReactFlowProvider>
      </Provider>,
    );
  };

  it('renders section title', () => {
    const { container } = renderSection();
    expect(container.textContent).toContain('Test Section');
  });

  it('renders as a div with correct classes', () => {
    const { container } = renderSection();
    const section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe('DIV');
    expect(section).toHaveClass('flex');
    expect(section).toHaveClass('h-full');
    expect(section).toHaveClass('w-full');
  });

  it('renders with different color variants', () => {
    const variants: Array<'white' | 'black' | 'blue' | 'purple' | 'red' | 'orange'> = [
      'white',
      'black',
      'blue',
      'purple',
      'red',
      'orange',
    ];

    variants.forEach((variant) => {
      const variantData: JagalchiSectionData = { ...mockData, variant };
      const { container } = renderSection(variantData);
      const section = container.firstChild as HTMLElement;
      expect(section).toBeInTheDocument();
    });
  });

  it('renders with default title when no title provided', () => {
    const dataWithoutTitle: JagalchiSectionData = {
      variant: 'white',
      isLocked: false,
    };
    const { container } = renderSection(dataWithoutTitle);
    expect(container.textContent).toContain('섹션');
  });

  it('is a memo component', () => {
    expect(typeof JagalchiSection).toBe('object');
  });

  it('renders title badge with correct classes', () => {
    const { container } = renderSection();
    const badge = container.querySelector('.rounded.px-2.py-1');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('text-sm');
    expect(badge).toHaveClass('font-medium');
  });

  it('renders container with border', () => {
    const { container } = renderSection();
    const innerContainer = container.querySelector('.rounded-lg.border-2');
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer).toHaveClass('flex-1');
  });

  it('has correct layout structure', () => {
    const { container } = renderSection();
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('flex-col');
    expect(section).toHaveClass('items-start');
    expect(section).toHaveClass('gap-1');
  });
});
