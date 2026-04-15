import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center p-4">{children}</div>;
}
