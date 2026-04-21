import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

const mockTree = [
  { id: 1, name: 'Frontend', parentId: null, children: [] },
  { id: 2, name: 'Backend', parentId: null, children: [] },
];

vi.mock('@/api/roadmap', () => ({
  getDirectoryTree: vi.fn().mockResolvedValue(mockTree),
}));

import { getDirectoryTree } from '@/api/roadmap';
import { useDirectoryTree } from './use-directory-tree';

describe('useDirectoryTree', () => {
  it('returns loading state initially', () => {
    const { result } = renderHook(() => useDirectoryTree(), {
      wrapper: createTestWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('calls getDirectoryTree on mount', async () => {
    const { result } = renderHook(() => useDirectoryTree(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getDirectoryTree).toHaveBeenCalled();
  });

  it('returns directory tree data on success', async () => {
    const { result } = renderHook(() => useDirectoryTree(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockTree);
  });

  it('returns error state when API fails', async () => {
    vi.mocked(getDirectoryTree).mockRejectedValueOnce(new Error('Forbidden'));

    const { result } = renderHook(() => useDirectoryTree(), {
      wrapper: createTestWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
