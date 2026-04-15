/** 브라우저 환경에서 MSW를 조건부로 초기화 */
export async function initMocks() {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'true') return;

  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}
