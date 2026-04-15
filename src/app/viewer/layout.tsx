import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '뷰어',
};

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
