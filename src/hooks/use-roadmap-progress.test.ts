import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  getMyProgress: vi.fn().mockResolvedValue({
    roadmapId: 1,
    totalNodes: 5,
    completedNodes: 2,
    progressPercentage: 40,
    completedNodeIds: [1, 2],
    updatedAt: '2026-01-01T00:00:00.000Z',
  }),
  completeNode: vi.fn().mockResolvedValue({
    nodeId: 3,
    isCompleted: true,
    roadmapProgress: 60,
    completedAt: '2026-01-01T00:00:00.000Z',
  }),
}));

import { getMyProgress, completeNode } from '@/api/roadmap';

import { useRoadmapProgress, useCompleteNode } from './use-roadmap-progress';

describe('useRoadmapProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches progress for a roadmap', async () => {
    const { result } = renderHook(() => useRoadmapProgress(1), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(getMyProgress).toHaveBeenCalledWith(1);
    expect(result.current.data?.progressPercentage).toBe(40);
  });

  it('does not fetch when roadmapId is falsy', () => {
    const { result } = renderHook(() => useRoadmapProgress(0), {
      wrapper: createTestWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(getMyProgress).not.toHaveBeenCalled();
  });
});

describe('useCompleteNode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls completeNode with correct params', async () => {
    const { result } = renderHook(() => useCompleteNode(1), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate({ nodeId: 3, isCompleted: true });

    await waitFor(() => {
      expect(completeNode).toHaveBeenCalledWith(1, 3, { isCompleted: true });
    });
  });

  it('passes optional link param', async () => {
    const { result } = renderHook(() => useCompleteNode(1), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate({ nodeId: 3, isCompleted: true, link: 'https://example.com' });

    await waitFor(() => {
      expect(completeNode).toHaveBeenCalledWith(1, 3, {
        isCompleted: true,
        link: 'https://example.com',
      });
    });
  });
});
