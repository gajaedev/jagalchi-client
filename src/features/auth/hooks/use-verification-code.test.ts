import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useVerificationCode } from './use-verification-code';

// Mock the mutation hooks
vi.mock('./use-send-verification-code', () => ({
  useSendVerificationCode: () => ({
    mutate: vi.fn((_data, options) => options?.onSuccess?.()),
    isPending: false,
    error: null,
  }),
}));

vi.mock('./use-verify-code', () => ({
  useVerifyCode: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
    error: null,
  }),
}));

describe('useVerificationCode', () => {
  it('초기 상태에서 isCodeSent가 false이다', () => {
    const { result } = renderHook(() => useVerificationCode());
    expect(result.current.isCodeSent).toBe(false);
  });

  it('handleSendCode 호출 후 isCodeSent가 true가 된다', () => {
    const { result } = renderHook(() => useVerificationCode());

    act(() => {
      result.current.handleSendCode('test@example.com');
    });

    expect(result.current.isCodeSent).toBe(true);
  });

  it('handleSendCode를 여러 번 호출해도 isCodeSent가 true를 유지한다', () => {
    const { result } = renderHook(() => useVerificationCode());

    act(() => {
      result.current.handleSendCode('test@example.com');
    });
    act(() => {
      result.current.handleSendCode('test@example.com');
    });

    expect(result.current.isCodeSent).toBe(true);
  });
});
