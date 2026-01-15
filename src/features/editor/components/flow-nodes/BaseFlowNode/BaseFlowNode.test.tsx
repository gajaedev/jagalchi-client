import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseFlowNode } from './index';

describe('BaseFlowNode', () => {
  describe('렌더링', () => {
    it('children을 렌더링한다', () => {
      render(
        <BaseFlowNode variant="white" state="default">
          <span>Test Content</span>
        </BaseFlowNode>,
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('custom className을 적용한다', () => {
      const { container } = render(
        <BaseFlowNode variant="white" state="default" className="custom-class">
          <span>Content</span>
        </BaseFlowNode>,
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('색상 Variants', () => {
    const variants = ['white', 'black', 'blue', 'purple', 'red', 'orange'] as const;

    it.each(variants)('%s variant를 default state로 렌더링한다', (variant) => {
      const { container } = render(
        <BaseFlowNode variant={variant} state="default">
          <span>Content</span>
        </BaseFlowNode>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it.each(variants)('%s variant를 focus state로 렌더링한다', (variant) => {
      const { container } = render(
        <BaseFlowNode variant={variant} state="focus">
          <span>Content</span>
        </BaseFlowNode>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('스타일링', () => {
    it('flex container로 렌더링된다', () => {
      const { container } = render(
        <BaseFlowNode variant="white" state="default">
          <span>Content</span>
        </BaseFlowNode>,
      );

      expect(container.firstChild).toHaveClass('flex');
      expect(container.firstChild).toHaveClass('items-center');
      expect(container.firstChild).toHaveClass('justify-center');
    });

    it('rounded border를 가진다', () => {
      const { container } = render(
        <BaseFlowNode variant="white" state="default">
          <span>Content</span>
        </BaseFlowNode>,
      );

      expect(container.firstChild).toHaveClass('rounded-lg');
      expect(container.firstChild).toHaveClass('border-2');
    });
  });
});
