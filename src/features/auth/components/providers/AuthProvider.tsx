'use client';

import { useRefreshToken } from '../../hooks/use-refresh-token';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * 앱 전역 인증 초기화 프로바이더.
 * 마운트 시 silent refresh를 시도하여 새로고침 후에도 인증 상태를 복원.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  useRefreshToken();
  return <>{children}</>;
}
