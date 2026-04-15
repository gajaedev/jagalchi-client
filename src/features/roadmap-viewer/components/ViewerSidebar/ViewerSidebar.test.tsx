import React from 'react';

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

vi.mock('@/hooks/use-roadmap-progress', () => ({
  useRoadmapProgress: () => ({ data: null }),
  useCompleteNode: () => ({ mutate: vi.fn() }),
}));

vi.mock('@xyflow/react', () => ({
  ReactFlowProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReactFlow: () => ({ fitView: vi.fn(), zoomIn: vi.fn(), zoomOut: vi.fn(), getZoom: () => 1 }),
  useNodesState: () => [[], vi.fn(), vi.fn()],
  useEdgesState: () => [[], vi.fn(), vi.fn()],
  ReactFlow: () => <div data-testid="react-flow" />,
  Background: () => null,
  Controls: () => null,
  MiniMap: () => null,
}));

import { VIEWER_MESSAGES } from '@/constants/messages';
import type { RoadmapNode } from '@/types/roadmap.types';
import { viewerRoadmapAtom } from '../../stores/viewer-atoms';
import { ViewerSidebar } from './index';

function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
}

function TestWrapper({
  initialValues = [],
  children,
}: {
  initialValues?: any;
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
}

const makeNode = (id: string, label: string): RoadmapNode =>
  ({
    id,
    type: 'jagalchi-node',
    position: { x: 0, y: 0 },
    data: { label, description: '', resources: [], variant: 'white', isLocked: false },
  }) as RoadmapNode;

const mockRoadmap = {
  id: 'r1',
  title: 'Test Roadmap',
  nodes: [makeNode('n1', 'Node Alpha'), makeNode('n2', 'Node Beta')],
  edges: [],
  isPublic: true,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
};

describe('ViewerSidebar', () => {
  it('renders sidebar title when isOpen is true', () => {
    render(
      <TestWrapper initialValues={[[viewerRoadmapAtom, mockRoadmap]]}>
        <ViewerSidebar isOpen={true} />
      </TestWrapper>,
    );
    expect(screen.getByText(VIEWER_MESSAGES.SIDEBAR_TITLE)).toBeTruthy();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <TestWrapper initialValues={[[viewerRoadmapAtom, mockRoadmap]]}>
        <ViewerSidebar isOpen={false} />
      </TestWrapper>,
    );
    expect(screen.queryByText(VIEWER_MESSAGES.SIDEBAR_TITLE)).toBeNull();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <TestWrapper initialValues={[[viewerRoadmapAtom, mockRoadmap]]}>
        <ViewerSidebar isOpen={true} onClose={onClose} />
      </TestWrapper>,
    );
    // The close button has an X icon; find it by its container button near the title
    const closeButton = document.querySelector('button[class*="rounded"]') as HTMLButtonElement;
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows node list from atom state', () => {
    render(
      <TestWrapper initialValues={[[viewerRoadmapAtom, mockRoadmap]]}>
        <ViewerSidebar isOpen={true} />
      </TestWrapper>,
    );
    expect(screen.getByText('Node Alpha')).toBeTruthy();
    expect(screen.getByText('Node Beta')).toBeTruthy();
  });

  it('shows empty state message when there are no nodes', () => {
    const emptyRoadmap = { ...mockRoadmap, nodes: [] };
    render(
      <TestWrapper initialValues={[[viewerRoadmapAtom, emptyRoadmap]]}>
        <ViewerSidebar isOpen={true} />
      </TestWrapper>,
    );
    expect(screen.getByText(VIEWER_MESSAGES.SIDEBAR_EMPTY)).toBeTruthy();
  });

  it('shows total count in footer', () => {
    render(
      <TestWrapper initialValues={[[viewerRoadmapAtom, mockRoadmap]]}>
        <ViewerSidebar isOpen={true} />
      </TestWrapper>,
    );
    expect(screen.getByText('총 2개 노드')).toBeTruthy();
  });
});
