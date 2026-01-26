import { render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { JagalchiNode } from '.';

import type { JagalchiNodeData } from '../../../types/editor.types';

describe('JagalchiNode', () => {
  const mockData: JagalchiNodeData = {
    label: 'Test Node',
    description: 'Test description',
    variant: 'white',
    resources: [],
    isLocked: false,
  };

  const renderNode = (data: JagalchiNodeData = mockData, selected = false) => {
    return render(
      <Provider>
        <ReactFlowProvider>
          <JagalchiNode id="Node_1" data={data} selected={selected} />
        </ReactFlowProvider>
      </Provider>,
    );
  };

  it('renders node label', () => {
    renderNode();
    expect(screen.getByText('Test Node')).toBeInTheDocument();
  });

  it('renders as a div with correct classes', () => {
    const { container } = renderNode();
    const node = container.firstChild as HTMLElement;
    expect(node.tagName).toBe('DIV');
    expect(node).toHaveClass('rounded-lg');
    expect(node).toHaveClass('border-2');
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
      const variantData: JagalchiNodeData = { ...mockData, variant };
      const { container } = renderNode(variantData);
      const node = container.firstChild as HTMLElement;
      expect(node).toBeInTheDocument();
    });
  });

  it('has 4 handles (top, right, bottom, left)', () => {
    renderNode();
    const handles = document.querySelectorAll('.react-flow__handle');
    expect(handles.length).toBe(4);
  });

  it('applies minimum width', () => {
    const { container } = renderNode();
    const node = container.firstChild as HTMLElement;
    expect(node).toHaveClass('min-w-[200px]');
  });

  it('truncates long labels', () => {
    const longData: JagalchiNodeData = {
      ...mockData,
      label: 'Very long node label that should be truncated',
    };
    renderNode(longData);
    const label = screen.getByText('Very long node label that should be truncated');
    expect(label).toHaveClass('truncate');
  });

  it('is a memo component', () => {
    expect(typeof JagalchiNode).toBe('object');
  });

  it('renders label with correct font styles', () => {
    renderNode();
    const label = screen.getByText('Test Node');
    expect(label).toHaveClass('text-base');
    expect(label).toHaveClass('font-medium');
  });

  it('has correct positioning classes', () => {
    const { container } = renderNode();
    const node = container.firstChild as HTMLElement;
    expect(node).toHaveClass('relative');
    expect(node).toHaveClass('flex');
    expect(node).toHaveClass('items-center');
    expect(node).toHaveClass('justify-center');
  });
});
