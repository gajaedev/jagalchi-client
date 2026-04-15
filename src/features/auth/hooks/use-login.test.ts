import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { createTestWrapper } from '@/test-utils';

vi.mock('@/api/auth', () => ({
  login: vi.fn().mockResolvedValue({ accessToken: 'mock-token' }),
}));

import { login } from '@/api/auth';
import { useLogin } from './use-login';

describe('useLogin', () => {
  it('calls login API with correct params', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createTestWrapper(),
    });

    const data = { email: 'test@example.com', password: 'password123' };
    result.current.mutate(data);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith(data, expect.anything());
    });
  });
});
