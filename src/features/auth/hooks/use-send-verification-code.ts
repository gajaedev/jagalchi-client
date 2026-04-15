import { useMutation } from '@tanstack/react-query';

import { sendVerificationCode } from '@/api/auth';
import type { SendVerificationCodeRequest } from '@/api/auth';

export function useSendVerificationCode() {
  return useMutation<void, Error, SendVerificationCodeRequest>({
    mutationFn: sendVerificationCode,
  });
}
