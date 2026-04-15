import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  sendVerificationCode: vi.fn().mockResolvedValue(undefined),
}));

import { sendVerificationCode } from '@/api/auth';
import { useSendVerificationCode } from './use-send-verification-code';

describe('useSendVerificationCode', () => {
  it('calls sendVerificationCode API with correct params', async () => {
    const { result } = renderHook(() => useSendVerificationCode(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(sendVerificationCode).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
