import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  signUp: vi.fn().mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test' }),
}));

import { signUp } from '@/api/auth';
import { useRegister } from './use-register';

describe('useRegister', () => {
  it('calls signUp API with correct params', async () => {
    const { result } = renderHook(() => useRegister(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com', name: 'Test', password: 'password123' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
