import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { EdgePropertiesPanel } from '.';

import type { Edge } from '@xyflow/react';

const mockEdge: Edge = {
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
  style: {
    stroke: '#000000',
  },
};

const renderWithProvider = (edge: Edge) => {
  return render(
    <Provider>
      <EdgePropertiesPanel edge={edge} />
    </Provider>,
  );
};

describe('EdgePropertiesPanel', () => {
  it('renders edge header with title', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('선')).toBeInTheDocument();
    expect(screen.getByText('연결선')).toBeInTheDocument();
  });

  it('renders lock button', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByRole('button', { name: /잠금/ })).toBeInTheDocument();
  });

  it('renders line style section', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('스타일')).toBeInTheDocument();
  });

  it('renders color selector section', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('기본 컬러')).toBeInTheDocument();
  });

  it('renders line style buttons', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('실선')).toBeInTheDocument();
    expect(screen.getByText('점선')).toBeInTheDocument();
    expect(screen.getByText('꼬인선')).toBeInTheDocument();
  });
});
