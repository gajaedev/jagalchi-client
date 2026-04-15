'use client';

import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { AUTH_MESSAGES } from '@/constants/messages';

import { useRegister } from '../../hooks/use-register';
import { useVerifyCode } from '../../hooks/use-verify-code';

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
  const router = useRouter();
  const [step, setStep] = useState<RegisterStep>(1);
  const step1DataRef = useRef<RegisterStep1Schema | null>(null);
  const step2DataRef = useRef<RegisterStep2Schema | null>(null);

  const verifyCodeMutation = useVerifyCode();
  const registerMutation = useRegister();

  const handleStep1Submit = (data: RegisterStep1Schema) => {
    verifyCodeMutation.mutate(
      { email: data.email, code: data.verificationCode },
      {
        onSuccess: () => {
          step1DataRef.current = data;
          setStep(2);
          onStepChange?.(2, AUTH_MESSAGES.STEP2_TITLE, AUTH_MESSAGES.STEP2_DESCRIPTION);
        },
      },
    );
  };

  const handleStep2Submit = (data: RegisterStep2Schema) => {
    step2DataRef.current = data;
    setStep(3);
    onStepChange?.(3, AUTH_MESSAGES.STEP3_TITLE, AUTH_MESSAGES.STEP3_DESCRIPTION);
  };

  const completeRegistration = (_links?: { name: string; url: string }[]) => {
    if (!step1DataRef.current || !step2DataRef.current) return;

    // TODO: _links는 회원가입 후 프로필 업데이트 API로 별도 처리
    registerMutation.mutate(
      {
        email: step1DataRef.current.email,
        name: step2DataRef.current.username,
        password: step1DataRef.current.password,
      },
      {
        onSuccess: () => {
          router.push('/login');
        },
        onError: () => {
          // registerMutation.error로 에러 상태 접근 가능
        },
      },
    );
  };

  const handleStep3Submit = (data: RegisterStep3Schema) => {
    const links = [
      { name: data.link1Name ?? '', url: data.link1Url ?? '' },
      { name: data.link2Name ?? '', url: data.link2Url ?? '' },
      { name: data.link3Name ?? '', url: data.link3Url ?? '' },
    ].filter((link) => link.name && link.url);

    completeRegistration(links.length > 0 ? links : undefined);
  };

  const handleSkip = () => {
    completeRegistration();
  };

  const handleGoogleRegister = () => {
    // TODO: Google OAuth
  };

  const handleGitHubRegister = () => {
    // TODO: GitHub OAuth
  };

  if (step === 3) {
    return <RegisterStep3Form onSubmit={handleStep3Submit} onSkip={handleSkip} />;
  }

  if (step === 2) {
    return <RegisterStep2Form onSubmit={handleStep2Submit} />;
  }

  return (
    <RegisterStep1Form
      onSubmit={handleStep1Submit}
      onGoogleRegister={handleGoogleRegister}
      onGitHubRegister={handleGitHubRegister}
    />
  );
}
