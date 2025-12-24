'use client';

import { forwardRef } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface VerificationCodeInputProps extends React.ComponentProps<'input'> {
  isCodeSent: boolean;
}

export const VerificationCodeInput = forwardRef<HTMLInputElement, VerificationCodeInputProps>(
  ({ isCodeSent, className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        id="verificationCode"
        type="text"
        placeholder="인증번호 입력"
        disabled={!isCodeSent}
        className={cn(className)}
        {...props}
      />
    );
  },
);

VerificationCodeInput.displayName = 'VerificationCodeInput';
