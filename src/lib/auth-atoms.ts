import { atom } from 'jotai';

/** 액세스 토큰 atom — 메모리에만 저장 (XSS 방어) */
export const accessTokenAtom = atom<string | null>(null);

/** 현재 로그인 상태 (토큰 존재 여부 기반) */
export const isAuthenticatedAtom = atom<boolean>((get) => {
  const token = get(accessTokenAtom);
  return token !== null;
});
