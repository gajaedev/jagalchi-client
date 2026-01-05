'use client';

import { useState } from 'react';

import { authApi } from '../../api/auth.api';
import { useRegister, useVerifyCode } from '../../hooks/use-auth-mutations';

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

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export function RegisterForm({ onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>(1);
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
  });

  const verifyCodeMutation = useVerifyCode();
  const registerMutation = useRegister();

  const handleStep1Submit = (data: RegisterStep1Schema) => {
    verifyCodeMutation.mutate(
      { email: data.email, code: data.verificationCode },
      {
        onSuccess: () => {
          setRegisterData((prev) => ({
            ...prev,
            email: data.email,
            password: data.password,
          }));
          setStep(2);
          onStepChange?.(2, '사용자 이름 설정', '사용자 이름을 입력해주세요');
        },
      },
    );
  };

  const handleStep2Submit = (data: RegisterStep2Schema) => {
    setRegisterData((prev) => ({
      ...prev,
      name: data.username,
    }));
    setStep(3);
    onStepChange?.(3, '사용자 프로필 링크 추가', '사용자 프로필에 표시할 링크를 입력해주세요');
  };

  const handleStep3Submit = (_data: RegisterStep3Schema) => {
    registerMutation.mutate({
      email: registerData.email,
      name: registerData.name,
      password: registerData.password,
    });
  };

  const handleSkip = () => {
    registerMutation.mutate({
      email: registerData.email,
      name: registerData.name,
      password: registerData.password,
    });
  };

  const handleGoogleRegister = () => {
    window.location.href = authApi.getGoogleLoginUrl();
  };

  if (step === 3) {
    return (
      <RegisterStep3Form
        onSubmit={handleStep3Submit}
        onSkip={handleSkip}
        isPending={registerMutation.isPending}
      />
    );
  }

  if (step === 2) {
    return <RegisterStep2Form onSubmit={handleStep2Submit} />;
  }

  return <RegisterStep1Form onSubmit={handleStep1Submit} onGoogleRegister={handleGoogleRegister} />;
}
