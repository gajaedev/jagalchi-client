import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  createDirectory: vi.fn().mockResolvedValue({}),
}));

import { createDirectory } from '@/api/roadmap';
import { useCreateDirectory } from './use-create-directory';

describe('useCreateDirectory', () => {
  it('calls createDirectory with name and parentId on mutate', async () => {
    const { result } = renderHook(() => useCreateDirectory(), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate({ name: 'New Folder', parentId: 3 });

    await waitFor(() => {
      expect(createDirectory).toHaveBeenCalledWith({
        name: 'New Folder',
        parentId: 3,
      });
    });
  });
});
