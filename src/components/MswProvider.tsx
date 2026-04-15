'use client';

import { useEffect, useState } from 'react';

const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

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
