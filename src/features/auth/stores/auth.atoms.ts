import { atom } from 'jotai';

import { setAccessToken, clearAccessToken } from '@/api/client';

/** 액세스 토큰 atom — 메모리에만 저장 (XSS 방어) */
const accessTokenAtom = atom<string | null>(null);

/** 인증 초기화 완료 여부 (refresh 시도 후 true) */
export const isAuthInitializedAtom = atom<boolean>(false);

/** 현재 로그인 상태 (토큰 존재 여부 기반) */
export const isAuthenticatedAtom = atom<boolean>((get) => {
  const token = get(accessTokenAtom);
  return token !== null;
});

/** 로그인 시 토큰 저장 */
export const loginAtom = atom(null, (_get, set, token: string) => {
  set(accessTokenAtom, token);
  setAccessToken(token);
});

/** 로그아웃 시 토큰 삭제 + 상태 초기화 */
export const logoutAtom = atom(null, (_get, set) => {
  set(accessTokenAtom, null);
  clearAccessToken();
});
