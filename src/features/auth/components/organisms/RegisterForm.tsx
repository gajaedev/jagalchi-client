'use client';

import { useState } from 'react';

import { RegisterStep1Form } from './register-steps/RegisterStep1Form';
import { RegisterStep2Form } from './register-steps/RegisterStep2Form';
import { RegisterStep3Form } from './register-steps/RegisterStep3Form';

import type {
  RegisterStep1Schema,
  RegisterStep2Schema,
  RegisterStep3Schema,
} from '../../schemas/auth.schema';
import type { RegisterStep } from '../../types/auth.types';

interface RegisterFormProps {
  onStepChange?: (step: RegisterStep, title: string, description: string) => void;
}

export function RegisterForm({ onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>(1);

  const handleStep1Submit = (_data: RegisterStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    setStep(2);
    onStepChange?.(2, '사용자 이름 설정', '사용자 이름을 입력해주세요');
  };

  const handleStep2Submit = (_data: RegisterStep2Schema) => {
    setStep(3);
    onStepChange?.(3, '사용자 프로필 링크 추가', '사용자 프로필에 표시할 링크를 입력해주세요');
  };

  const handleStep3Submit = (_data: RegisterStep3Schema) => {
    // TODO: API 연동 - 회원가입 완료
  };

  const handleSkip = () => {
    // TODO: API 연동 - 링크 없이 회원가입 완료
  };

  const handleGoogleRegister = () => {
    // TODO: Google OAuth
  };

  if (step === 3) {
    return <RegisterStep3Form onSubmit={handleStep3Submit} onSkip={handleSkip} />;
  }

  if (step === 2) {
    return <RegisterStep2Form onSubmit={handleStep2Submit} />;
  }

  return <RegisterStep1Form onSubmit={handleStep1Submit} onGoogleRegister={handleGoogleRegister} />;
}
