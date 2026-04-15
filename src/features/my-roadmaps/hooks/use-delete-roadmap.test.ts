import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  deleteRoadmap: vi.fn().mockResolvedValue({}),
}));

import { deleteRoadmap } from '@/api/roadmap';
import { useDeleteRoadmap } from './use-delete-roadmap';

describe('useDeleteRoadmap', () => {
  it('calls deleteRoadmap with roadmapId on mutate', async () => {
    const { result } = renderHook(() => useDeleteRoadmap(), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate(42);

    await waitFor(() => {
      expect(deleteRoadmap).toHaveBeenCalledWith(42);
    });
  });
});
