import { Inter, JetBrains_Mono } from 'next/font/google';

import { MSWProvider } from '@/components/MswProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { AuthProvider } from '@/features/auth';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '자갈치 — 개발자 학습 로드맵 플랫폼',
    template: '%s | 자갈치',
  },
  description:
    '개발자의 학습 경로를 노드 기반 에디터로 생성하고, 포크·공유하는 플랫폼. 제작자의 경력으로 로드맵을 신뢰하고, 학습 기록이 자산으로 쌓입니다.',
  icons: {
    icon: '/jagalchi.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: '자갈치 — 개발자 학습 로드맵 플랫폼',
    description: '개발자의 학습 경로를 노드 기반 에디터로 생성하고, 포크·공유하는 플랫폼.',
    siteName: '자갈치',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '자갈치 — 개발자 학습 로드맵 플랫폼',
    description: '개발자의 학습 경로를 노드 기반 에디터로 생성하고, 포크·공유하는 플랫폼.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <MSWProvider>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
