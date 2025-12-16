'use client';

import { useState } from 'react';

export function useVerificationCode() {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    // TODO: API 연동 - 인증번호 전송
    setIsCodeSent(true);
  };

  return { isCodeSent, handleSendCode };
}
