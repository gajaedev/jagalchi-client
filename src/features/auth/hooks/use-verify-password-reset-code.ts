import { useMutation } from '@tanstack/react-query';

import { verifyPasswordResetCode } from '@/api/auth';
import type { VerifyCodeRequest } from '@/api/auth';

export function useVerifyPasswordResetCode() {
  return useMutation<void, Error, VerifyCodeRequest>({
    mutationFn: verifyPasswordResetCode,
  });
}
