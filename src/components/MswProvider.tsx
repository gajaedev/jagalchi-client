'use client';

import { useEffect, useState } from 'react';

/**
 * MSW는 개발/프리뷰 환경에서만 허용. 프로덕션 번들 유입을 막기 위해
 * 두 조건을 모두 만족해야 동작한다:
 *   1) NEXT_PUBLIC_API_MOCKING === 'true'
 *   2) NODE_ENV !== 'production'
 * 프로덕션 배포에서 실수로 NEXT_PUBLIC_API_MOCKING 가 true 로 설정되더라도
 * NODE_ENV 가 production 이므로 MSW 가 로드되지 않는다.
 */
const isMockingEnabled =
  process.env.NEXT_PUBLIC_API_MOCKING === 'true' && process.env.NODE_ENV !== 'production';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(!isMockingEnabled);

  useEffect(() => {
    if (!isMockingEnabled) return;

    const timeout = setTimeout(() => setIsReady(true), 3000);

    async function init() {
      try {
        const { initMocks } = await import('@/mocks');
        await initMocks();
      } catch {
        // MSW init failed — proceed without mocking
      }
      clearTimeout(timeout);
      setIsReady(true);
    }
    init();

    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) return null;
  return <>{children}</>;
}
