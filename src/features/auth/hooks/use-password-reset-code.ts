'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useSendPasswordResetCode } from './use-send-password-reset-code';
import { useVerifyPasswordResetCode } from './use-verify-password-reset-code';

const RESEND_COOLDOWN_SECONDS = 30;

/**
 * 비밀번호 재설정용 인증 코드 전송·검증 상태 및 로직 관리
 * 30초 재전송 쿨다운, 재전송 시 코드 필드 초기화 지원
 */
export function usePasswordResetCode() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sendCodeMutation = useSendPasswordResetCode();
  const verifyCodeMutation = useVerifyPasswordResetCode();

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
