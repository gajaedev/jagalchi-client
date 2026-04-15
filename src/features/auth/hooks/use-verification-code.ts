'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useSendVerificationCode } from './use-send-verification-code';
import { useVerifyCode } from './use-verify-code';

const RESEND_COOLDOWN_SECONDS = 30;

/**
 * Manages the state and logic for sending and verifying verification codes during authentication.
 * Includes a 30-second resend cooldown and resets the code field on resend.
 * @returns Object containing the code sent state, handlers, mutation states, and cooldown info
 */
export function useVerificationCode() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sendCodeMutation = useSendVerificationCode();
  const verifyCodeMutation = useVerifyCode();

  const startCooldown = useCallback(() => {
    setCooldownSeconds(RESEND_COOLDOWN_SECONDS);
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }
    cooldownTimerRef.current = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) {
            clearInterval(cooldownTimerRef.current);
            cooldownTimerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);

  const handleSendCode = (email: string, onResend?: () => void) => {
    sendCodeMutation.mutate(
      { email },
      {
        onSuccess: () => {
          if (isCodeSent && onResend) {
            onResend();
          }
          setIsCodeSent(true);
          startCooldown();
        },
      },
    );
  };

  const handleVerifyCode = (email: string, code: string) => {
    return verifyCodeMutation.mutateAsync({ email, code });
  };

  const isCooldownActive = cooldownSeconds > 0;

  return {
    isCodeSent,
    handleSendCode,
    handleVerifyCode,
    isSendingCode: sendCodeMutation.isPending,
    isVerifyingCode: verifyCodeMutation.isPending,
    sendCodeError: sendCodeMutation.error,
    verifyCodeError: verifyCodeMutation.error,
    cooldownSeconds,
    isCooldownActive,
  };
}
