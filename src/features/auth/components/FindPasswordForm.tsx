'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
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

import type { FindPasswordStep } from '../types/auth.types';

interface FindPasswordFormProps {
  onStepChange?: (step: FindPasswordStep, title: string, description: string) => void;
}

export function FindPasswordForm({ onStepChange }: FindPasswordFormProps) {
  const [step, setStep] = useState<FindPasswordStep>(1);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const step1Form = useForm<FindPasswordStep1Schema>({
    resolver: zodResolver(findPasswordStep1Schema),
  });

  const step2Form = useForm<FindPasswordStep2Schema>({
    resolver: zodResolver(findPasswordStep2Schema),
  });

  const handleSendCode = () => {
    // TODO: API 연동 - 인증번호 전송
    console.log('Send verification code');
    setIsCodeSent(true);
  };

  const onStep1Submit = (data: FindPasswordStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    console.log('Step 1:', data);
    setStep(2);
    onStepChange?.(2, '새 비밀번호 입력', '재설정할 비밀번호를 입력해주세요');
  };

  const onStep2Submit = (data: FindPasswordStep2Schema) => {
    // TODO: API 연동 - 비밀번호 재설정
    console.log('Step 2:', data);
  };

  // Step 2: 새 비밀번호 설정
  if (step === 2) {
    return (
      <form
        key="step2"
        onSubmit={step2Form.handleSubmit(onStep2Submit)}
        className="flex flex-col gap-7"
      >
        {/* 새 비밀번호 필드 */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="newPassword" className="text-sm font-medium">
            새 비밀번호
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호 입력"
              className="pr-10"
              autoComplete="new-password"
              aria-invalid={!!step2Form.formState.errors.newPassword}
              {...step2Form.register('newPassword')}
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
          {step2Form.formState.errors.newPassword && (
            <p role="alert" className="text-destructive text-sm font-medium">
              {step2Form.formState.errors.newPassword.message}
            </p>
          )}
        </div>

        {/* 비밀번호 확인 필드 */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="passwordConfirm" className="text-sm font-medium">
            비밀번호 확인
          </Label>
          <div className="relative">
            <Input
              id="passwordConfirm"
              type={showPasswordConfirm ? 'text' : 'password'}
              placeholder="비밀번호 다시 입력"
              className="pr-10"
              autoComplete="new-password"
              aria-invalid={!!step2Form.formState.errors.passwordConfirm}
              {...step2Form.register('passwordConfirm')}
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              aria-label={showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPasswordConfirm ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </button>
          </div>
          {step2Form.formState.errors.passwordConfirm && (
            <p role="alert" className="text-destructive text-sm font-medium">
              {step2Form.formState.errors.passwordConfirm.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          완료
        </Button>
      </form>
    );
  }

  // Step 1: 이메일 인증
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

      {/* 버튼 */}
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
