import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** 인증이 필요한 라우트 */
const PROTECTED_ROUTES = ['/myroadmap', '/profile', '/editor'];

/** 로그인 상태에서 접근 차단할 라우트 */
const AUTH_ROUTES = ['/login', '/register', '/find-password'];

const SESSION_COOKIE_KEY = 'jagalchi-session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.get(SESSION_COOKIE_KEY)?.value === '1';

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // 로그인 상태에서 auth 페이지 접근 시 홈으로 리다이렉트
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/myroadmap', request.url));
  }

  // 비로그인 상태에서 보호 라우트 접근 시 로그인으로 리다이렉트
  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL('/login', request.url);
    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/myroadmap/:path*',
    '/profile/:path*',
    '/editor/:path*',
    '/login',
    '/register',
    '/find-password',
  ],
};
