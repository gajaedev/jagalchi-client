import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/roadmap', () => ({
  getDirectoryTree: vi.fn().mockResolvedValue([]),
}));

import { useDirectoryTree } from './use-directory-tree';

describe('useDirectoryTree', () => {
  it('returns query result with loading state', () => {
    const { result } = renderHook(() => useDirectoryTree(), {
      wrapper: createTestWrapper(),
    });

    expect(result.current.isLoading).toBeDefined();
  });
});
