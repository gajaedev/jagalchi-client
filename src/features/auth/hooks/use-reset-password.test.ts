import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  resetPassword: vi.fn().mockResolvedValue(undefined),
}));

import { resetPassword } from '@/api/auth';
import { useResetPassword } from './use-reset-password';

describe('useResetPassword', () => {
  it('calls resetPassword API with correct params', async () => {
    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com', newPassword: 'newPassword123' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
