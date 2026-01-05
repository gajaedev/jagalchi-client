'use client';

import { useState } from 'react';

import { useSendPasswordReset, useSendVerification } from './use-auth-mutations';

interface UseVerificationCodeOptions {
  type?: 'register' | 'password-reset';
}

export function useVerificationCode({ type = 'register' }: UseVerificationCodeOptions = {}) {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const sendVerificationMutation = useSendVerification();
  const sendPasswordResetMutation = useSendPasswordReset();

  const mutation = type === 'register' ? sendVerificationMutation : sendPasswordResetMutation;

  const handleSendCode = (email: string) => {
    mutation.mutate(email, {
      onSuccess: () => {
        setIsCodeSent(true);
      },
    });
  };

  return {
    isCodeSent,
    handleSendCode,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
