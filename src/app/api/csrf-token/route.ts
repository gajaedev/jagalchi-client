import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { randomBytes } from 'crypto';

const CSRF_COOKIE_NAME = 'csrf-token';
const TOKEN_MAX_AGE_SECONDS = 7_200; // 2시간
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * CSRF 토큰 발급 엔드포인트.
 *
 * 기존 쿠키가 있으면 재사용하되 만료를 갱신(슬라이딩)하고,
 * 없으면 새 토큰을 발급해 HttpOnly 쿠키로 세트한다.
 * 클라이언트는 응답 JSON의 `token` 필드를 읽어
 * 변경 요청(POST/PUT/PATCH/DELETE) 시 `X-CSRF-Token` 헤더에 담아야 한다.
 */
export function GET(request: NextRequest) {
  const existingToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const token = existingToken ?? randomBytes(32).toString('hex');

  const response = NextResponse.json({ token });

  // 항상 Set-Cookie로 만료를 갱신한다 (슬라이딩 만료).
  // httpOnly: true — 클라이언트는 JSON 바디로 토큰을 읽으므로 document.cookie 불필요.
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_MAX_AGE_SECONDS,
  });

  return response;
}
