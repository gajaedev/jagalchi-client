import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '자갈치 — 개발자 학습 로드맵 플랫폼',
    short_name: '자갈치',
    description: '개발자의 학습 경로를 노드 기반 에디터로 생성하고, 포크·공유하는 플랫폼.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: 'ko',
    orientation: 'portrait',
    icons: [
      {
        src: '/jagalchi.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  };
}
