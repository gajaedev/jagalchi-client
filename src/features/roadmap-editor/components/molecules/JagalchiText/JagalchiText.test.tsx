import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { JagalchiText } from '.';

import type { JagalchiTextData } from '../../../types/editor.types';

describe('JagalchiText', () => {
  const mockData: JagalchiTextData = {
    content: 'Test Text',
    variant: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    isLocked: false,
  };

  const renderText = (data: JagalchiTextData = mockData) => {
    return render(<JagalchiText data={data} />);
  };

  it('renders text content', () => {
    const { container } = renderText();
    expect(container.textContent).toContain('Test Text');
  });

  it('renders as a div with correct classes', () => {
    const { container } = renderText();
    const textElement = container.firstChild as HTMLElement;
    expect(textElement.tagName).toBe('DIV');
    expect(textElement).toHaveClass('min-w-[80px]');
    expect(textElement).toHaveClass('px-1');
  });

  it('renders with different color variants', () => {
    const variants: Array<'gray' | 'black' | 'blue' | 'purple' | 'red' | 'orange'> = [
      'gray',
      'black',
      'blue',
      'purple',
      'red',
      'orange',
    ];

    variants.forEach((variant) => {
      const variantData: JagalchiTextData = { ...mockData, variant };
      const { container } = renderText(variantData);
      const textElement = container.firstChild as HTMLElement;
      expect(textElement).toBeInTheDocument();
    });
  });

  it('renders with default content when no content provided', () => {
    const dataWithoutContent: JagalchiTextData = {
      variant: 'black',
      fontSize: 14,
      fontWeight: 'normal',
      isLocked: false,
    };
    const { container } = renderText(dataWithoutContent);
    expect(container.textContent).toContain('텍스트');
  });

  it('applies custom font size', () => {
    const dataWithCustomSize: JagalchiTextData = {
      ...mockData,
      fontSize: 20,
    };
    const { container } = renderText(dataWithCustomSize);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toHaveStyle({ fontSize: '20px' });
  });

  it('applies bold font weight', () => {
    const dataWithBold: JagalchiTextData = {
      ...mockData,
      fontWeight: 'bold',
    };
    const { container } = renderText(dataWithBold);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toHaveStyle({ fontWeight: '600' });
  });

  it('applies normal font weight', () => {
    const { container } = renderText();
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toHaveStyle({ fontWeight: '400' });
  });

  it('is a memo component', () => {
    expect(typeof JagalchiText).toBe('object');
  });
});
