'use client';

import { forwardRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FormErrorMessage } from '../atoms/FormErrorMessage';

interface VerificationCodeInputProps extends React.ComponentProps<'input'> {
  isCodeSent: boolean;
  onResend?: () => void;
  errorMessage?: string;
}

export const VerificationCodeInput = forwardRef<HTMLInputElement, VerificationCodeInputProps>(
  ({ isCodeSent, onResend, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="verificationCode"
            className={`text-sm font-medium ${isCodeSent ? '' : 'text-muted-foreground'}`}
          >
            인증번호
          </Label>
          {isCodeSent && onResend && (
            <button
              type="button"
              className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700"
              onClick={onResend}
            >
              재전송
            </button>
          )}
        </div>
        <Input
          ref={ref}
          id="verificationCode"
          type="text"
          placeholder="인증번호 입력"
          disabled={!isCodeSent}
          aria-invalid={!!errorMessage}
          {...props}
        />
        <FormErrorMessage message={errorMessage} />
      </div>
    );
  },
);

VerificationCodeInput.displayName = 'VerificationCodeInput';
