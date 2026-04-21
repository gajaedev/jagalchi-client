import { atom } from 'jotai';

import { setAccessToken, clearAccessToken } from '@/api/client';
import { accessTokenAtom } from '@/lib/auth-atoms';
import { extractUserNameFromToken } from '@/lib/jwt';

export { isAuthenticatedAtom } from '@/lib/auth-atoms';

/** 현재 로그인한 사용자 이름 — JWT payload에서 추출 */
export const currentUserNameAtom = atom<string | null>(null);

/** 인증 초기화 완료 여부 (refresh 시도 후 true) */
export const isAuthInitializedAtom = atom<boolean>(false);

/** 로그인 시 토큰 저장 + JWT에서 이름 추출 */
export const loginAtom = atom(null, (_get, set, token: string) => {
  set(accessTokenAtom, token);
  setAccessToken(token);
  const name = extractUserNameFromToken(token);
  set(currentUserNameAtom, name);
});

/** 로그아웃 시 토큰 삭제 + 상태 초기화 */
export const logoutAtom = atom(null, (_get, set) => {
  set(accessTokenAtom, null);
  set(currentUserNameAtom, null);
  clearAccessToken();
});
