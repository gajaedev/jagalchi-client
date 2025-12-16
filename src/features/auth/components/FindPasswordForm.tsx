'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  findPasswordStep1Schema,
  findPasswordStep2Schema,
  type FindPasswordStep1Schema,
  type FindPasswordStep2Schema,
} from '../schemas/auth.schema';

import { FormErrorMessage } from './FormErrorMessage';
import { PasswordInput } from './PasswordInput';
import { VerificationCodeInput } from './VerificationCodeInput';

import type { FindPasswordStep } from '../types/auth.types';

interface FindPasswordFormProps {
  onStepChange?: (step: FindPasswordStep, title: string, description: string) => void;
}

export function FindPasswordForm({ onStepChange }: FindPasswordFormProps) {
  const [step, setStep] = useState<FindPasswordStep>(1);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const step1Form = useForm<FindPasswordStep1Schema>({
    resolver: zodResolver(findPasswordStep1Schema),
  });

  const step2Form = useForm<FindPasswordStep2Schema>({
    resolver: zodResolver(findPasswordStep2Schema),
  });

  const handleSendCode = () => {
    // TODO: API 연동 - 인증번호 전송
    setIsCodeSent(true);
  };

  const onStep1Submit = (data: FindPasswordStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    void data;
    setStep(2);
    onStepChange?.(2, '새 비밀번호 입력', '재설정할 비밀번호를 입력해주세요');
  };

  const onStep2Submit = (data: FindPasswordStep2Schema) => {
    // TODO: API 연동 - 비밀번호 재설정
    void data;
  };

  if (step === 2) {
    return (
      <form
        key="step2"
        onSubmit={step2Form.handleSubmit(onStep2Submit)}
        className="flex flex-col gap-7"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="newPassword" className="text-sm font-medium">
            새 비밀번호
          </Label>
          <PasswordInput
            id="newPassword"
            placeholder="비밀번호 입력"
            autoComplete="new-password"
            error={!!step2Form.formState.errors.newPassword}
            {...step2Form.register('newPassword')}
          />
          <FormErrorMessage message={step2Form.formState.errors.newPassword?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="passwordConfirm" className="text-sm font-medium">
            비밀번호 확인
          </Label>
          <PasswordInput
            id="passwordConfirm"
            placeholder="비밀번호 다시 입력"
            autoComplete="new-password"
            error={!!step2Form.formState.errors.passwordConfirm}
            {...step2Form.register('passwordConfirm')}
          />
          <FormErrorMessage message={step2Form.formState.errors.passwordConfirm?.message} />
        </div>

        <Button type="submit" className="w-full">
          완료
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-sm font-medium">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일 입력"
          aria-invalid={!!step1Form.formState.errors.email}
          {...step1Form.register('email')}
        />
        <FormErrorMessage message={step1Form.formState.errors.email?.message} />
      </div>

      <VerificationCodeInput
        isCodeSent={isCodeSent}
        onResend={handleSendCode}
        error={!!step1Form.formState.errors.verificationCode}
        {...step1Form.register('verificationCode')}
      />
      <FormErrorMessage message={step1Form.formState.errors.verificationCode?.message} />

      {isCodeSent ? (
        <Button type="submit" className="w-full">
          다음
        </Button>
      ) : (
        <Button type="button" className="w-full" onClick={handleSendCode}>
          인증번호 전송
        </Button>
      )}
    </form>
  );
}
