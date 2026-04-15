import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  verifyPasswordResetCode: vi.fn().mockResolvedValue(undefined),
}));

import { verifyPasswordResetCode } from '@/api/auth';
import { useVerifyPasswordResetCode } from './use-verify-password-reset-code';

describe('useVerifyPasswordResetCode', () => {
  it('calls verifyPasswordResetCode API with correct params', async () => {
    const { result } = renderHook(() => useVerifyPasswordResetCode(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com', code: '123456' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(verifyPasswordResetCode).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
