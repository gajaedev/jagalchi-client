'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  registerStep1Schema,
  registerStep2Schema,
  type RegisterStep1Schema,
  type RegisterStep2Schema,
} from '../schemas/auth.schema';

import { FormErrorMessage } from './FormErrorMessage';
import { GoogleAuthButton } from './GoogleAuthButton';
import { PasswordInput } from './PasswordInput';
import { VerificationCodeInput } from './VerificationCodeInput';

import type { RegisterStep } from '../types/auth.types';

interface RegisterFormProps {
  onStepChange?: (step: RegisterStep, title: string, description: string) => void;
}

export function RegisterForm({ onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>(1);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const step1Form = useForm<RegisterStep1Schema>({
    resolver: zodResolver(registerStep1Schema),
  });

  const step2Form = useForm<RegisterStep2Schema>({
    resolver: zodResolver(registerStep2Schema),
  });

  const handleSendCode = () => {
    // TODO: API 연동 - 인증번호 전송
    setIsCodeSent(true);
  };

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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="display-name" className="text-sm font-medium">
            이름
          </Label>
          <Input
            id="display-name"
            type="text"
            placeholder="사용자 이름 입력"
            autoComplete="off"
            aria-invalid={!!step2Form.formState.errors.username}
            {...step2Form.register('username')}
          />
          <FormErrorMessage message={step2Form.formState.errors.username?.message} />
        </div>

        <Button type="submit" className="w-full">
          확인
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-sm font-medium">
          비밀번호
        </Label>
        <PasswordInput
          id="password"
          placeholder="비밀번호 지정"
          error={!!step1Form.formState.errors.password}
          {...step1Form.register('password')}
        />
        <FormErrorMessage message={step1Form.formState.errors.password?.message} />
      </div>

      <VerificationCodeInput
        isCodeSent={isCodeSent}
        onResend={handleSendCode}
        error={!!step1Form.formState.errors.verificationCode}
        {...step1Form.register('verificationCode')}
      />
      <FormErrorMessage message={step1Form.formState.errors.verificationCode?.message} />

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
