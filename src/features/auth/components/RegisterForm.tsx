'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
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

import { GoogleAuthButton } from './GoogleAuthButton';

import type { RegisterStep } from '../types/auth.types';

interface RegisterFormProps {
  onStepChange?: (step: RegisterStep, title: string, description: string) => void;
}

export function RegisterForm({ onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const step1Form = useForm<RegisterStep1Schema>({
    resolver: zodResolver(registerStep1Schema),
  });

  const step2Form = useForm<RegisterStep2Schema>({
    resolver: zodResolver(registerStep2Schema),
  });

  const handleSendCode = () => {
    // TODO: API 연동 - 인증번호 전송
    console.log('Send verification code');
    setIsCodeSent(true);
  };

  const onStep1Submit = (data: RegisterStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    console.log('Step 1:', data);
    setStep(2);
    onStepChange?.(2, '사용자 이름 설정', '사용자 이름을 입력해주세요');
  };

  const onStep2Submit = (data: RegisterStep2Schema) => {
    // TODO: API 연동 - 회원가입 완료
    console.log('Step 2:', data);
  };

  const handleGoogleRegister = () => {
    // TODO: Google OAuth
    console.log('Google register');
  };

  // Step 2: 사용자 이름 설정
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
          {step2Form.formState.errors.username && (
            <p role="alert" className="text-destructive text-sm font-medium">
              {step2Form.formState.errors.username.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          확인
        </Button>
      </form>
    );
  }

  // Step 1: 이메일, 비밀번호, 인증번호
  return (
    <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="flex flex-col gap-7">
      {/* 이메일 필드 */}
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
        {step1Form.formState.errors.email && (
          <p role="alert" className="text-destructive text-sm font-medium">
            {step1Form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* 비밀번호 필드 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-sm font-medium">
          비밀번호
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 지정"
            className="pr-10"
            aria-invalid={!!step1Form.formState.errors.password}
            {...step1Form.register('password')}
          />
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        </div>
        {step1Form.formState.errors.password && (
          <p role="alert" className="text-destructive text-sm font-medium">
            {step1Form.formState.errors.password.message}
          </p>
        )}
      </div>

      {/* 인증번호 필드 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="verificationCode"
            className={`text-sm font-medium ${isCodeSent ? '' : 'text-muted-foreground'}`}
          >
            인증번호
          </Label>
          {isCodeSent && (
            <button
              type="button"
              className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700"
              onClick={handleSendCode}
            >
              재전송
            </button>
          )}
        </div>
        <Input
          id="verificationCode"
          type="text"
          placeholder="인증번호 입력"
          disabled={!isCodeSent}
          aria-invalid={!!step1Form.formState.errors.verificationCode}
          {...step1Form.register('verificationCode')}
        />
        {step1Form.formState.errors.verificationCode && (
          <p role="alert" className="text-destructive text-sm font-medium">
            {step1Form.formState.errors.verificationCode.message}
          </p>
        )}
      </div>

      {/* 버튼 그룹 */}
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
