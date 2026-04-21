/** 브라우저 환경에서 MSW를 조건부로 초기화 (프로덕션 차단 이중 가드) */
export async function initMocks() {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'true') return;
  if (process.env.NODE_ENV === 'production') return;

  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}
