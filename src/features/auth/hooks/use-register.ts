import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/api/auth';
import type { SignUpRequest, SignUpResponse } from '@/api/auth';

export function useRegister() {
  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
  });
}
