import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  sendPasswordResetCode: vi.fn().mockResolvedValue(undefined),
}));

import { sendPasswordResetCode } from '@/api/auth';
import { useSendPasswordResetCode } from './use-send-password-reset-code';

describe('useSendPasswordResetCode', () => {
  it('calls sendPasswordResetCode API with correct params', async () => {
    const { result } = renderHook(() => useSendPasswordResetCode(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(sendPasswordResetCode).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
