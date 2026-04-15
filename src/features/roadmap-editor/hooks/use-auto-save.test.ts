import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import type { RoadmapNode } from '../types/editor.types';
import type { Roadmap } from '../types/roadmap.types';
import type { Edge } from '@xyflow/react';

// Mock useDebounce to return value immediately (controlled by fake timers)
vi.mock('@/hooks/use-debounce', () => ({
  useDebounce: <T>(value: T, _delay: number): T => value,
}));

// Mock parseRoadmaps
const mockParseRoadmaps = vi.fn<(stored: string | null) => unknown[]>();
vi.mock('../schemas/roadmap.schema', () => ({
  parseRoadmaps: (stored: string | null) => mockParseRoadmaps(stored),
}));

// Mock STORAGE_KEY
vi.mock('../services/roadmap-storage', () => ({
  STORAGE_KEY: 'jagalchi-roadmaps',
}));

import { useAutoSave } from './use-auto-save';

const STORAGE_KEY = 'jagalchi-roadmaps';

const makeNode = (id: string, label: string): RoadmapNode =>
  ({
    id,
    type: 'jagalchi-node',
    position: { x: 0, y: 0 },
    data: { label, description: '', resources: [], variant: 'white', isLocked: false },
  }) as RoadmapNode;

const makeEdge = (id: string, source: string, target: string): Edge =>
  ({
    id,
    source,
    target,
  }) as Edge;

const makeRoadmap = (overrides: Partial<Roadmap> = {}): Roadmap => ({
  id: 1,
  title: 'Test Roadmap',
  nodes: [],
  edges: [],
  isPublic: false,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
});

describe('useAutoSave', () => {
  let setItemSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'getItem');
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    mockParseRoadmaps.mockReturnValue([]);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('saves to localStorage when nodes change', () => {
    mockParseRoadmaps.mockReturnValue([]);

    const nodes1 = [makeNode('n1', 'Node 1')];
    const nodes2 = [makeNode('n1', 'Node 1'), makeNode('n2', 'Node 2')];

    const { rerender } = renderHook(
      ({ nodes }) =>
        useAutoSave({
          roadmapId: '1',
          nodes,
          edges: [],
          title: 'Test',
          isEnabled: true,
        }),
      { initialProps: { nodes: nodes1 } },
    );

    // First render triggers save (refs start empty)
    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, expect.any(String));
    setItemSpy.mockClear();
    mockParseRoadmaps.mockReturnValue([]);

    // Change nodes
    rerender({ nodes: nodes2 });

    expect(setItemSpy).toHaveBeenCalledWith(STORAGE_KEY, expect.any(String));
    const savedData = JSON.parse(setItemSpy.mock.calls[0][1] as string) as Roadmap[];
    expect(savedData[0].nodes).toHaveLength(2);
  });

  it('does not save when isEnabled is false', () => {
    renderHook(() =>
      useAutoSave({
        roadmapId: '1',
        nodes: [makeNode('n1', 'Node 1')],
        edges: [],
        title: 'Test',
        isEnabled: false,
      }),
    );

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('updates existing roadmap (upsert) when roadmap exists in storage', () => {
    const existingRoadmap = makeRoadmap({
      id: 1,
      title: 'Old Title',
      nodes: [],
      edges: [],
    });
    mockParseRoadmaps.mockReturnValue([existingRoadmap]);

    renderHook(() =>
      useAutoSave({
        roadmapId: '1',
        nodes: [makeNode('n1', 'New Node')],
        edges: [],
        title: 'Updated Title',
        isEnabled: true,
      }),
    );

    expect(setItemSpy).toHaveBeenCalled();
    const savedData = JSON.parse(
      setItemSpy.mock.calls[setItemSpy.mock.calls.length - 1][1] as string,
    ) as Roadmap[];
    expect(savedData).toHaveLength(1);
    expect(savedData[0].title).toBe('Updated Title');
    expect(savedData[0].nodes).toHaveLength(1);
    // Should preserve createdAt from existing roadmap
    expect(savedData[0].createdAt).toBe(existingRoadmap.createdAt);
  });

  it('creates new roadmap when roadmap does not exist in storage', () => {
    const otherRoadmap = makeRoadmap({ id: 2 });
    mockParseRoadmaps.mockReturnValue([otherRoadmap]);

    renderHook(() =>
      useAutoSave({
        roadmapId: '99',
        nodes: [makeNode('n1', 'Node 1')],
        edges: [],
        title: 'New Roadmap',
        isEnabled: true,
      }),
    );

    expect(setItemSpy).toHaveBeenCalled();
    const savedData = JSON.parse(
      setItemSpy.mock.calls[setItemSpy.mock.calls.length - 1][1] as string,
    ) as Roadmap[];
    expect(savedData).toHaveLength(2);
    expect(savedData[0].id).toBe(2);
    expect(savedData[1].id).toBe(99);
    expect(savedData[1].title).toBe('New Roadmap');
  });

  it('skips save when data has not changed', () => {
    const nodes = [makeNode('n1', 'Node 1')];
    const edges = [makeEdge('e1', 'n1', 'n2')];
    mockParseRoadmaps.mockReturnValue([]);

    const { rerender } = renderHook(
      ({ nodes: n, edges: e, title: t }) =>
        useAutoSave({
          roadmapId: '1',
          nodes: n,
          edges: e,
          title: t,
          isEnabled: true,
        }),
      { initialProps: { nodes, edges, title: 'Test' } },
    );

    // First render saves (refs start empty)
    expect(setItemSpy).toHaveBeenCalled();
    setItemSpy.mockClear();

    // Re-render with exact same data - should skip
    act(() => {
      rerender({ nodes, edges, title: 'Test' });
    });

    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
