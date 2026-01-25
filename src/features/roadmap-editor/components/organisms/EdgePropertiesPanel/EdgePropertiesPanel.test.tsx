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
  it('renders edge header with ID', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('edge-1')).toBeInTheDocument();
  });

  it('renders lock button', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByRole('button', { name: /잠금/ })).toBeInTheDocument();
  });

  it('renders line style select', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('라인 스타일')).toBeInTheDocument();
  });

  it('renders color selector section', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByText('기본 컬러')).toBeInTheDocument();
  });

  it('shows solid line style by default', () => {
    renderWithProvider(mockEdge);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows dashed line style for dashed edge', () => {
    const dashedEdge = {
      ...mockEdge,
      style: { ...mockEdge.style, strokeDasharray: '5 5' },
    };
    renderWithProvider(dashedEdge);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
