import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  getRoadmaps: vi.fn().mockResolvedValue({
    content: [
      {
        id: 1,
        title: 'My Roadmap',
        tags: [],
        owner: { id: 2, nickname: '김철수', profileImageUrl: null },
      },
      {
        id: 2,
        title: 'Another Roadmap',
        tags: ['react'],
        owner: { id: 2, nickname: '김철수', profileImageUrl: null },
      },
    ],
    pageable: { pageNumber: 0, pageSize: 12 },
    totalElements: 2,
    totalPages: 1,
    hasNext: false,
  }),
}));

import { getRoadmaps } from '@/api/roadmap';
import { useRoadmaps } from './use-roadmaps';

describe('useRoadmaps', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('calls getRoadmaps with default empty params', async () => {
    const { result } = renderHook(() => useRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getRoadmaps).toHaveBeenCalledWith({});
  });

  it('calls getRoadmaps with provided params', async () => {
    const params = { page: 1, size: 10, directoryId: 5 };
    const { result } = renderHook(() => useRoadmaps(params), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getRoadmaps).toHaveBeenCalledWith(params);
  });

  it('returns data on success', async () => {
    const { result } = renderHook(() => useRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect((result.current.data as any)?.content).toHaveLength(2);
  });

  it('returns error state when API fails', async () => {
    vi.mocked(getRoadmaps).mockRejectedValueOnce(new Error('Server error'));

    const { result } = renderHook(() => useRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
