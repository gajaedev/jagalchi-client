import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  updateDirectory: vi.fn().mockResolvedValue({}),
}));

import { updateDirectory } from '@/api/roadmap';
import { useUpdateDirectory } from './use-update-directory';

describe('useUpdateDirectory', () => {
  it('calls updateDirectory with id and name on mutate', async () => {
    const { result } = renderHook(() => useUpdateDirectory(), {
      wrapper: createTestWrapper(),
    });

    result.current.mutate({ id: 10, name: 'Renamed Folder' });

    await waitFor(() => {
      expect(updateDirectory).toHaveBeenCalledWith(10, {
        name: 'Renamed Folder',
      });
    });
  });
});
