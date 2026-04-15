import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { createTestWrapper } from '@/test-utils';

const mockSetAccessToken = vi.fn();
const mockClearAccessToken = vi.fn();

vi.mock('@/api/auth', () => ({
  refreshToken: vi.fn(),
}));

vi.mock('@/api/client', () => ({
  setAccessToken: (...args: unknown[]) => mockSetAccessToken(...args),
  clearAccessToken: (...args: unknown[]) => mockClearAccessToken(...args),
}));

import { refreshToken } from '@/api/auth';

import { useRefreshToken } from './use-refresh-token';

describe('useRefreshToken', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls refreshToken on mount and sets initialized', async () => {
    vi.mocked(refreshToken).mockResolvedValue({ accessToken: 'new-token' });

    renderHook(() => useRefreshToken(), { wrapper: createTestWrapper() });

    // flush the initial async refresh (use runOnlyPendingTimers to avoid infinite interval loop)
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    expect(refreshToken).toHaveBeenCalled();
    // loginAtom calls setAccessToken internally
    expect(mockSetAccessToken).toHaveBeenCalledWith('new-token');
  });

  it('clears token and logs out on refresh failure', async () => {
    vi.mocked(refreshToken).mockRejectedValue(new Error('expired'));

    renderHook(() => useRefreshToken(), { wrapper: createTestWrapper() });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    // logoutAtom calls clearAccessToken, plus the hook itself calls clearAccessToken
    expect(mockClearAccessToken).toHaveBeenCalled();
  });

  it('starts interval on successful refresh', async () => {
    vi.mocked(refreshToken).mockResolvedValue({ accessToken: 'token' });

    renderHook(() => useRefreshToken(), { wrapper: createTestWrapper() });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    vi.mocked(refreshToken).mockClear();

    // Advance by 14 minutes
    await act(async () => {
      await vi.advanceTimersByTimeAsync(14 * 60 * 1000);
    });

    expect(refreshToken).toHaveBeenCalledTimes(1);
  });

  it('does not start interval on failed refresh', async () => {
    vi.mocked(refreshToken).mockRejectedValue(new Error('fail'));

    renderHook(() => useRefreshToken(), { wrapper: createTestWrapper() });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    vi.mocked(refreshToken).mockClear();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(14 * 60 * 1000);
    });

    expect(refreshToken).not.toHaveBeenCalled();
  });

  it('cleans up interval on unmount', async () => {
    vi.mocked(refreshToken).mockResolvedValue({ accessToken: 'token' });

    const { unmount } = renderHook(() => useRefreshToken(), {
      wrapper: createTestWrapper(),
    });

    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });

    unmount();
    vi.mocked(refreshToken).mockClear();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(14 * 60 * 1000);
    });

    expect(refreshToken).not.toHaveBeenCalled();
  });
});
