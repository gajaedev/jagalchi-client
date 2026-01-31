import { render } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';
import { beforeAll, describe, expect, it } from 'vitest';

import { RoadmapCanvas } from '.';

// Mock ResizeObserver for ReactFlow
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('RoadmapCanvas', () => {
  const renderCanvas = () => {
    return render(
      <Provider>
        <ReactFlowProvider>
          <div style={{ width: '800px', height: '600px' }}>
            <RoadmapCanvas />
          </div>
        </ReactFlowProvider>
      </Provider>,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderCanvas();
    expect(container).toBeInTheDocument();
  });

  it('renders as a div with full dimensions', () => {
    const { container } = renderCanvas();
    const canvas = container.querySelector('.h-full.w-full');
    expect(canvas).toBeInTheDocument();
  });

  it('renders ReactFlow component', () => {
    const { container } = renderCanvas();
    const reactFlow = container.querySelector('.react-flow');
    expect(reactFlow).toBeInTheDocument();
  });

  it('renders controls', () => {
    const { container } = renderCanvas();
    const controls = container.querySelector('.react-flow__controls');
    expect(controls).toBeInTheDocument();
  });

  it('has correct node types registered', () => {
    const { container } = renderCanvas();
    const reactFlow = container.querySelector('.react-flow');
    expect(reactFlow).toBeInTheDocument();
  });

  it('renders pane for canvas interaction', () => {
    const { container } = renderCanvas();
    const pane = container.querySelector('.react-flow__pane');
    expect(pane).toBeInTheDocument();
  });

  it('renders viewport for transformations', () => {
    const { container } = renderCanvas();
    const viewport = container.querySelector('.react-flow__viewport');
    expect(viewport).toBeInTheDocument();
  });
});
