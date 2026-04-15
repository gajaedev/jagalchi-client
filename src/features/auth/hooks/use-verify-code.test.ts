import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  verifyCode: vi.fn().mockResolvedValue(undefined),
}));

import { verifyCode } from '@/api/auth';
import { useVerifyCode } from './use-verify-code';

describe('useVerifyCode', () => {
  it('calls verifyCode API with correct params', async () => {
    const { result } = renderHook(() => useVerifyCode(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com', code: '123456' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(verifyCode).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
