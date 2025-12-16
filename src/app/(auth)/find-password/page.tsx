'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AuthCard, FindPasswordForm } from '@/features/auth';

export default function FindPasswordPage() {
  const [cardInfo, setCardInfo] = useState({
    title: '이메일 인증',
    description: '비밀번호를 재설정할 이메일을 입력해주세요',
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
              로그인하기
            </Link>
          </p>
        ) : undefined
      }
    >
      <FindPasswordForm onStepChange={handleStepChange} />
    </AuthCard>
  );
}
