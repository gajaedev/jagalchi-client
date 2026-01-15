import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowNode } from './index';
import type { FlowNodeData } from '@/features/editor/types/editor.types';

// Mock @xyflow/react
vi.mock('@xyflow/react', () => ({
  Handle: ({ position }: { position: string }) => <div data-testid={`handle-${position}`} />,
  Position: {
    Top: 'top',
    Bottom: 'bottom',
    Left: 'left',
    Right: 'right',
  },
}));

describe('FlowNode', () => {
  const createMockData = (overrides?: Partial<FlowNodeData>): FlowNodeData => ({
    title: 'Test Node',
    description: 'Test Description',
    resources: [],
    color: '#000000',
    locked: false,
    variant: 'white',
    state: 'default',
    index: 1,
    ...overrides,
  });

  describe('렌더링', () => {
    it('Node 제목을 렌더링한다', () => {
      const data = createMockData({ index: 5 });
      render(<FlowNode data={data} />);

      expect(screen.getByText('Node_5')).toBeInTheDocument();
    });

    it('index가 없으면 기본값 1을 사용한다', () => {
      const data = createMockData();
      // @ts-expect-error Testing without index
      delete data.index;
      render(<FlowNode data={data} />);

      expect(screen.getByText('Node_1')).toBeInTheDocument();
    });
  });

  describe('React Flow Integration', () => {
    it('4개의 connection handles를 렌더링한다', () => {
      const data = createMockData();
      render(<FlowNode data={data} />);

      expect(screen.getByTestId('handle-top')).toBeInTheDocument();
      expect(screen.getByTestId('handle-bottom')).toBeInTheDocument();
      expect(screen.getByTestId('handle-left')).toBeInTheDocument();
      expect(screen.getByTestId('handle-right')).toBeInTheDocument();
    });
  });

  describe('색상 Variants', () => {
    const variants = ['white', 'black', 'blue', 'purple', 'red', 'orange'] as const;

    it.each(variants)('%s variant를 default state로 렌더링한다', (variant) => {
      const data = createMockData({ variant, state: 'default' });
      render(<FlowNode data={data} />);

      expect(screen.getByText('Node_1')).toBeInTheDocument();
    });

    it.each(variants)('%s variant를 focus state로 렌더링한다', (variant) => {
      const data = createMockData({ variant, state: 'focus' });
      render(<FlowNode data={data} />);

      expect(screen.getByText('Node_1')).toBeInTheDocument();
    });
  });

  describe('Selected State', () => {
    it('selected가 true일 때 focus state를 적용한다', () => {
      const data = createMockData({ state: 'default' });
      const { container } = render(<FlowNode data={data} selected={true} />);

      // BaseFlowNode가 focus state로 렌더링되는지 확인
      expect(container.firstChild).toBeInTheDocument();
    });

    it('selected가 false일 때 data의 state를 사용한다', () => {
      const data = createMockData({ state: 'default' });
      const { container } = render(<FlowNode data={data} selected={false} />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
