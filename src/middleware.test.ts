import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';

import { middleware } from './middleware';

function makeRequest(pathname: string, hasSession = false) {
  const url = new URL(pathname, 'http://localhost:3000');
  const headers = new Headers();
  if (hasSession) {
    headers.set('cookie', 'jagalchi-session=1');
  }
  return new NextRequest(url, { headers });
}

describe('middleware', () => {
  describe('보호된 라우트 (PROTECTED_ROUTES)', () => {
    const protectedPaths = [
      '/myroadmap',
      '/myroadmap/123',
      '/profile',
      '/profile/abc',
      '/editor',
      '/editor/new',
    ];

    it.each(protectedPaths)('세션 없이 %s 접근 시 /login 으로 리다이렉트한다', (pathname) => {
      const req = makeRequest(pathname);
      const res = middleware(req);

      expect(res.status).toBe(307);
      const location = res.headers.get('location') ?? '';
      expect(location).toContain('/login');
    });

    it('세션 없이 보호 경로 접근 시 redirect 쿼리에 원래 경로가 담긴다', () => {
      const req = makeRequest('/myroadmap/123');
      const res = middleware(req);

      const location = res.headers.get('location') ?? '';
      const url = new URL(location);
      expect(url.searchParams.get('redirect')).toBe('/myroadmap/123');
    });

    it.each(protectedPaths)('세션 있으면 %s 정상 통과한다', (pathname) => {
      const req = makeRequest(pathname, true);
      const res = middleware(req);

      // NextResponse.next() — 리다이렉트가 없어야 한다
      expect(res.status).not.toBe(307);
      expect(res.headers.get('location')).toBeNull();
    });
  });

  describe('인증 라우트 (AUTH_ROUTES)', () => {
    const authPaths = ['/login', '/register', '/find-password'];

    it.each(authPaths)('세션 없이 %s 접근 시 그대로 통과한다', (pathname) => {
      const req = makeRequest(pathname);
      const res = middleware(req);

      expect(res.status).not.toBe(307);
      expect(res.headers.get('location')).toBeNull();
    });

    it.each(authPaths)(
      '세션 있는 상태에서 %s 접근 시 /myroadmap 으로 리다이렉트한다',
      (pathname) => {
        const req = makeRequest(pathname, true);
        const res = middleware(req);

        expect(res.status).toBe(307);
        const location = res.headers.get('location') ?? '';
        expect(location).toContain('/myroadmap');
      },
    );
  });

  describe('퍼블릭 경로 (PROTECTED/AUTH 둘 다 아닌 경로)', () => {
    it('세션 없이 공개 경로 접근 시 그대로 통과한다', () => {
      const req = makeRequest('/community');
      const res = middleware(req);

      expect(res.status).not.toBe(307);
      expect(res.headers.get('location')).toBeNull();
    });

    it('세션 있어도 공개 경로 접근 시 그대로 통과한다', () => {
      const req = makeRequest('/community', true);
      const res = middleware(req);

      expect(res.status).not.toBe(307);
      expect(res.headers.get('location')).toBeNull();
    });
  });
});
