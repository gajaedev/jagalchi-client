'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AUTH_MESSAGES } from '@/constants/messages';
import { AuthCard, RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  const [cardInfo, setCardInfo] = useState<{
    title: string;
    description: string;
    showFooter: boolean;
  }>({
    title: AUTH_MESSAGES.REGISTER_TITLE,
    description: AUTH_MESSAGES.REGISTER_DESCRIPTION,
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
            {AUTH_MESSAGES.REGISTER_HAS_ACCOUNT}{' '}
            <Link
              href="/login"
              className="cursor-pointer underline transition-colors hover:text-neutral-700"
            >
              {AUTH_MESSAGES.REGISTER_LOGIN_LINK}
            </Link>
          </p>
        ) : undefined
      }
    >
      <RegisterForm onStepChange={handleStepChange} />
    </AuthCard>
  );
}
