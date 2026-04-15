import { useEffect, useRef } from 'react';

import { useSetAtom } from 'jotai';

import { refreshToken } from '@/api/auth';
import { clearAccessToken } from '@/api/client';

import { loginAtom, logoutAtom, isAuthInitializedAtom } from '../stores/auth.atoms';

/** 토큰 갱신 주기 (14분 — 일반적인 15분 만료 기준) */
const REFRESH_INTERVAL_MS = 14 * 60 * 1000;

/**
 * 앱 마운트 시 silent refresh를 시도하고, 주기적으로 토큰을 갱신하는 훅.
 * 새로고침 후에도 httpOnly 리프레시 쿠키가 남아있으면 자동으로 재인증.
 */
export function useRefreshToken() {
  const setLogin = useSetAtom(loginAtom);
  const setLogout = useSetAtom(logoutAtom);
  const setInitialized = useSetAtom(isAuthInitializedAtom);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const tryRefresh = async () => {
      try {
        const response = await refreshToken();
        if (!isCancelled) {
          setLogin(response.accessToken);
        }
        return true;
      } catch {
        if (!isCancelled) {
          clearAccessToken();
          setLogout();
        }
        return false;
      }
    };

    // 마운트 시 1회 silent refresh
    tryRefresh().then((isSuccess) => {
      if (isCancelled) return;
      setInitialized(true);

      // 성공 시 주기적 갱신 시작
      if (isSuccess) {
        intervalRef.current = setInterval(() => {
          tryRefresh();
        }, REFRESH_INTERVAL_MS);
      }
    });

    return () => {
      isCancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setLogin, setLogout, setInitialized]);
}
