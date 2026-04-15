import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  createRoadmap: vi.fn().mockResolvedValue({}),
}));

import { createRoadmap } from '@/api/roadmap';
import { useCreateRoadmap } from './use-create-roadmap';

describe('useCreateRoadmap', () => {
  it('calls createRoadmap on mutate', async () => {
    const { result } = renderHook(() => useCreateRoadmap(), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate({ title: 'Test Roadmap', directoryId: 1 });

    await waitFor(() => {
      expect(createRoadmap).toHaveBeenCalledWith({
        title: 'Test Roadmap',
        directoryId: 1,
      });
    });
  });
});
