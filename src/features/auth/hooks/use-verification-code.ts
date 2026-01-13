'use client';

import { useState } from 'react';

/**
 * Manages the state and logic for sending verification codes during authentication.
 * @returns Object containing the code sent state and the handler to trigger sending
 */
export function useVerificationCode() {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    // TODO: API 연동 - 인증번호 전송
    setIsCodeSent(true);
  };

  return { isCodeSent, handleSendCode };
}
