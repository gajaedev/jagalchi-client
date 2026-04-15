'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AUTH_MESSAGES } from '@/constants/messages';
import { AuthCard, FindPasswordForm } from '@/features/auth';

export default function FindPasswordPage() {
  const [cardInfo, setCardInfo] = useState<{
    title: string;
    description: string;
    showFooter: boolean;
  }>({
    title: AUTH_MESSAGES.FIND_PASSWORD_TITLE,
    description: AUTH_MESSAGES.FIND_PASSWORD_DESCRIPTION,
    showFooter: true,
  });

  const handleStepChange = (_step: number, title: string, description: string) => {
    setCardInfo({
      title,
      description,
      showFooter: true,
    });
  };

  return (
    <AuthCard
      title={cardInfo.title}
      description={cardInfo.description}
      footer={
        cardInfo.showFooter ? (
          <p className="text-center text-sm tracking-[0.07px]">
            <Link href="/login" className="text-foreground underline underline-offset-4">
              {AUTH_MESSAGES.LOGIN_BACK_LINK}
            </Link>
          </p>
        ) : undefined
      }
    >
      <FindPasswordForm onStepChange={handleStepChange} />
    </AuthCard>
  );
}
