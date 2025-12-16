'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useVerificationCode } from '../../hooks/use-verification-code';
import {
  registerStep1Schema,
  registerStep2Schema,
  type RegisterStep1Schema,
  type RegisterStep2Schema,
} from '../../schemas/auth.schema';
import { GoogleAuthButton } from '../atoms/GoogleAuthButton';
import { FormField } from '../molecules/FormField';
import { PasswordInput } from '../molecules/PasswordInput';
import { VerificationCodeInput } from '../molecules/VerificationCodeInput';

import type { RegisterStep } from '../../types/auth.types';

interface RegisterFormProps {
  onStepChange?: (step: RegisterStep, title: string, description: string) => void;
}

export function RegisterForm({ onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>(1);
  const { isCodeSent, handleSendCode } = useVerificationCode();

  const step1Form = useForm<RegisterStep1Schema>({
    resolver: zodResolver(registerStep1Schema),
  });

  const step2Form = useForm<RegisterStep2Schema>({
    resolver: zodResolver(registerStep2Schema),
  });

  const onStep1Submit = (data: RegisterStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    void data;
    setStep(2);
    onStepChange?.(2, '사용자 이름 설정', '사용자 이름을 입력해주세요');
  };

  const onStep2Submit = (data: RegisterStep2Schema) => {
    // TODO: API 연동 - 회원가입 완료
    void data;
  };

  const handleGoogleRegister = () => {
    // TODO: Google OAuth
  };

  if (step === 2) {
    return (
      <form
        key="step2"
        onSubmit={step2Form.handleSubmit(onStep2Submit)}
        className="flex flex-col gap-7"
      >
        <FormField
          label="이름"
          htmlFor="display-name"
          error={step2Form.formState.errors.username?.message}
        >
          <Input
            id="display-name"
            type="text"
            placeholder="사용자 이름 입력"
            autoComplete="off"
            aria-invalid={!!step2Form.formState.errors.username}
            {...step2Form.register('username')}
          />
        </FormField>

        <Button type="submit" className="w-full">
          확인
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="flex flex-col gap-7">
      <FormField label="이메일" htmlFor="email" error={step1Form.formState.errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="이메일 입력"
          aria-invalid={!!step1Form.formState.errors.email}
          {...step1Form.register('email')}
        />
      </FormField>

      <FormField
        label="비밀번호"
        htmlFor="password"
        error={step1Form.formState.errors.password?.message}
      >
        <PasswordInput
          id="password"
          placeholder="비밀번호 지정"
          error={!!step1Form.formState.errors.password}
          {...step1Form.register('password')}
        />
      </FormField>

      <VerificationCodeInput
        isCodeSent={isCodeSent}
        onResend={handleSendCode}
        errorMessage={step1Form.formState.errors.verificationCode?.message}
        {...step1Form.register('verificationCode')}
      />

      <div className="flex flex-col gap-3">
        {isCodeSent ? (
          <Button type="submit" className="w-full">
            다음
          </Button>
        ) : (
          <Button type="button" className="w-full" onClick={handleSendCode}>
            인증번호 전송
          </Button>
        )}
        <GoogleAuthButton variant="register" onClick={handleGoogleRegister} />
      </div>
    </form>
  );
}
