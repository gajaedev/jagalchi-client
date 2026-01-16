import { renderHook } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, it, expect } from 'vitest';

import { useSidebarData } from './use-sidebar-data';

describe('useSidebarData', () => {
  it('returns zero selectedCount when nothing is selected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider>{children}</Provider>
    );

    const { result } = renderHook(() => useSidebarData(), { wrapper });

    expect(result.current.selectedCount).toBe(0);
  });

  it('returns empty sidebar data when nothing is selected', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider>{children}</Provider>
    );

    const { result } = renderHook(() => useSidebarData(), { wrapper });

    expect(result.current.nodeData).toBeUndefined();
    expect(result.current.lineData).toBeUndefined();
    expect(result.current.sectionData).toBeUndefined();
    expect(result.current.textData).toBeUndefined();
  });
});
