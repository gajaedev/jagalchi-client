import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  updateRoadmap: vi.fn().mockResolvedValue({}),
}));

import { updateRoadmap } from '@/api/roadmap';
import { useUpdateRoadmap } from './use-update-roadmap';

describe('useUpdateRoadmap', () => {
  it('calls updateRoadmap with roadmapId and data on mutate', async () => {
    const { result } = renderHook(() => useUpdateRoadmap(), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate({ roadmapId: 7, data: { title: 'Updated' } });

    await waitFor(() => {
      expect(updateRoadmap).toHaveBeenCalledWith(7, { title: 'Updated' });
    });
  });
});
