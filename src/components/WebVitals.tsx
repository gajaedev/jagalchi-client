'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== 'production') return;

    // Sentry에 Web Vitals 전송 (SENTRY_DSN 있을 때)
    if (typeof window !== 'undefined' && 'Sentry' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Sentry?.captureEvent?.({
        message: `Web Vital: ${metric.name}`,
        level: 'info',
        extra: { value: metric.value, rating: metric.rating, id: metric.id },
      });
    }

    // analytics 콘솔 로그 (개발 디버깅용 제거됨)
    // 추후 GA4/Amplitude 연동 시 여기에 추가
  });

  return null;
}
