import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  deleteDirectory: vi.fn().mockResolvedValue({}),
}));

import { deleteDirectory } from '@/api/roadmap';
import { useDeleteDirectory } from './use-delete-directory';

describe('useDeleteDirectory', () => {
  it('calls deleteDirectory with id on mutate', async () => {
    const { result } = renderHook(() => useDeleteDirectory(), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate(5);

    await waitFor(() => {
      expect(deleteDirectory).toHaveBeenCalledWith(5);
    });
  });
});
