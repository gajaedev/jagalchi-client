import { useMutation } from '@tanstack/react-query';

import { verifyCode } from '@/api/auth';
import type { VerifyCodeRequest } from '@/api/auth';

export function useVerifyCode() {
  return useMutation<void, Error, VerifyCodeRequest>({
    mutationFn: verifyCode,
  });
}
