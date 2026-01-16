import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Position, ReactFlowProvider } from '@xyflow/react';

import { FlowEdge } from './index';

describe('FlowEdge', () => {
  const defaultProps = {
    id: 'edge-1',
    source: 'node-1',
    target: 'node-2',
    sourceX: 0,
    sourceY: 0,
    targetX: 100,
    targetY: 100,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };

  it('renders with default data', () => {
    const { container } = render(
      <ReactFlowProvider>
        <FlowEdge {...defaultProps} />
      </ReactFlowProvider>,
    );

    expect(container.querySelector('.react-flow__edge-path')).toBeInTheDocument();
  });

  it('renders with custom style and color', () => {
    const { container } = render(
      <ReactFlowProvider>
        <FlowEdge
          {...defaultProps}
          data={{
            style: 'dashed',
            color: '#ff0000',
          }}
        />
      </ReactFlowProvider>,
    );

    const edgePath = container.querySelector('.react-flow__edge-path');
    expect(edgePath).toBeInTheDocument();
    expect(edgePath).toHaveStyle({ stroke: '#ff0000' });
  });

  it('renders solid line style correctly', () => {
    const { container } = render(
      <ReactFlowProvider>
        <FlowEdge
          {...defaultProps}
          data={{
            style: 'solid',
            color: '#000000',
          }}
        />
      </ReactFlowProvider>,
    );

    const edgePath = container.querySelector('.react-flow__edge-path');
    expect(edgePath).toHaveStyle({ strokeDasharray: '0' });
  });
});
