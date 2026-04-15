import Link from 'next/link';

import { AUTH_MESSAGES } from '@/constants/messages';
import { AuthCard, LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <AuthCard
      title={AUTH_MESSAGES.LOGIN_TITLE}
      description={AUTH_MESSAGES.LOGIN_DESCRIPTION}
      footer={
        <p className="w-full text-center text-sm">
          {AUTH_MESSAGES.LOGIN_NO_ACCOUNT}{' '}
          <Link
            href="/register"
            className="cursor-pointer underline transition-colors hover:text-neutral-700"
          >
            {AUTH_MESSAGES.LOGIN_REGISTER_LINK}
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
