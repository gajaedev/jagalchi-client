import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '프로필',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
