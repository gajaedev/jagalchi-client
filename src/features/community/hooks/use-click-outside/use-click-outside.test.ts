import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useClickOutside } from './index';

describe('useClickOutside', () => {
  it('should call callback when clicking outside', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, callback));

    fireEvent.mouseDown(document.body);
    expect(callback).toHaveBeenCalled();

    document.body.removeChild(ref.current);
  });

  it('should not call callback when clicking inside', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, callback));

    fireEvent.mouseDown(ref.current);
    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(ref.current);
  });
});
