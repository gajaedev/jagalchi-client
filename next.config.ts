import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

import type { NextConfig } from 'next';

const API_ORIGIN = process.env.API_ORIGIN ?? 'https://api.jagalchi.dev';
const CDN_ORIGIN = 'https://cdn.jagalchi.dev';
// WebSocket: ws(s)://api.jagalchi.dev for STOMP realtime
const WS_ORIGIN = API_ORIGIN.replace(/^https?/, 'wss');

const cspHeader = [
  `default-src 'self'`,
  // Scripts: self + Next.js inline scripts (unsafe-inline은 nonce 도입 전 임시 허용)
  `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
  // Styles: self + inline (Tailwind CSS-in-JS, shadcn 인라인)
  `style-src 'self' 'unsafe-inline'`,
  // Images: self + CDN + OAuth 아바타 출처
  `img-src 'self' data: blob: ${CDN_ORIGIN} https://avatars.githubusercontent.com https://lh3.googleusercontent.com https://*.r2.dev https://*.s3.amazonaws.com`,
  // Fonts: self (Next.js google fonts 로컬 다운로드)
  `font-src 'self'`,
  // API 요청 + WebSocket
  `connect-src 'self' ${API_ORIGIN} ${WS_ORIGIN}`,
  // Frames: same-origin only (X-Frame-Options SAMEORIGIN과 일치)
  `frame-src 'self'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  // 위반 리포트 — 운영 중 CSP 위반 수집 (Sentry 연동 후 report-uri 교체 가능)
  `upgrade-insecure-requests`,
]
  .join('; ')
  .trim();

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'cdn.jagalchi.dev' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: '*.s3.amazonaws.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const hasSentryDsn = Boolean(process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN);

export default hasSentryDsn
  ? withSentryConfig(bundleAnalyzer(nextConfig), {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: true,
      widenClientFileUpload: true,
      sourcemaps: { disable: false, deleteSourcemapsAfterUpload: true },
      disableLogger: true,
      automaticVercelMonitors: false,
    })
  : bundleAnalyzer(nextConfig);
