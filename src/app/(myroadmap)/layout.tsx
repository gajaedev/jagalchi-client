import { AppHeader } from '@/features/notifications';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 로드맵',
};

export default function MyRoadmapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
