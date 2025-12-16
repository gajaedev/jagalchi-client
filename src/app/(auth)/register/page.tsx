'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AuthCard, RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  const [cardInfo, setCardInfo] = useState({
    title: '회원가입',
    description: '회원가입할 이메일 정보를 입력해주세요',
    showFooter: true,
  });

  const handleStepChange = (step: number, title: string, description: string) => {
    setCardInfo({
      title,
      description,
      showFooter: step === 1,
    });
  };

  return (
    <AuthCard
      title={cardInfo.title}
      description={cardInfo.description}
      footer={
        cardInfo.showFooter ? (
          <p className="w-full text-center text-sm">
            이미 계정이 있나요?{' '}
            <Link
              href="/login"
              className="cursor-pointer underline transition-colors hover:text-neutral-700"
            >
              로그인
            </Link>
          </p>
        ) : undefined
      }
    >
      <RegisterForm onStepChange={handleStepChange} />
    </AuthCard>
  );
}
