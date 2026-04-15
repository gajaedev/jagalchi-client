import { useMutation } from '@tanstack/react-query';

import { sendPasswordResetCode } from '@/api/auth';
import type { SendVerificationCodeRequest } from '@/api/auth';

export function useSendPasswordResetCode() {
  return useMutation<void, Error, SendVerificationCodeRequest>({
    mutationFn: sendPasswordResetCode,
  });
}
