import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  getPopularRoadmaps: vi.fn().mockResolvedValue({
    content: [
      {
        id: 1,
        title: 'Popular Roadmap',
        tags: [],
        owner: { id: 1, nickname: '홍길동', profileImageUrl: null },
      },
    ],
    pageable: { pageNumber: 0, pageSize: 12 },
    totalElements: 1,
    totalPages: 1,
    hasNext: false,
  }),
}));

import { getPopularRoadmaps } from '@/api/roadmap';
import { usePopularRoadmaps } from './use-popular-roadmaps';

describe('usePopularRoadmaps', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => usePopularRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('calls getPopularRoadmaps with default empty params', async () => {
    const { result } = renderHook(() => usePopularRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getPopularRoadmaps).toHaveBeenCalledWith({});
  });

  it('calls getPopularRoadmaps with provided params', async () => {
    const params = { page: 0, size: 6 };
    const { result } = renderHook(() => usePopularRoadmaps(params), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getPopularRoadmaps).toHaveBeenCalledWith(params);
  });

  it('returns data on success', async () => {
    const { result } = renderHook(() => usePopularRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect((result.current.data as any)?.content).toHaveLength(1);
  });

  it('returns error state when API fails', async () => {
    vi.mocked(getPopularRoadmaps).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => usePopularRoadmaps(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
