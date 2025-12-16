import Link from 'next/link';

import { AuthCard, LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인해서 계속하기"
      description="이메일 주소를 입력해주세요"
      footer={
        <p className="w-full text-center text-sm">
          아직 계정이 없나요?{' '}
          <Link
            href="/register"
            className="cursor-pointer underline transition-colors hover:text-neutral-700"
          >
            회원가입
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
