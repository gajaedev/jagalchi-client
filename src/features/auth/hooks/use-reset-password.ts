import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '@/api/auth';
import type { ChangePasswordRequest } from '@/api/auth';

export function useResetPassword() {
  return useMutation<void, Error, ChangePasswordRequest>({
    mutationFn: resetPassword,
  });
}
