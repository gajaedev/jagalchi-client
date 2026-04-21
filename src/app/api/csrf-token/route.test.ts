import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';

import { GET } from './route';

function makeRequest(cookieHeader?: string) {
  const url = new URL('/api/csrf-token', 'http://localhost:3000');
  const headers = new Headers();
  if (cookieHeader) {
    headers.set('cookie', cookieHeader);
  }
  return new NextRequest(url, { headers });
}

describe('GET /api/csrf-token', () => {
  describe('신규 토큰 발급', () => {
    it('기존 쿠키가 없으면 새 토큰을 발급한다', async () => {
      const req = makeRequest();
      const res = GET(req);

      const body = await res.json();
      expect(body).toHaveProperty('token');
      expect(typeof body.token).toBe('string');
    });

    it('신규 토큰은 64자 hex 문자열이다 (32바이트)', async () => {
      const req = makeRequest();
      const res = GET(req);

      const body = await res.json();
      expect(body.token).toMatch(/^[0-9a-f]{64}$/);
    });

    it('응답에 csrf-token Set-Cookie 헤더가 포함된다', () => {
      const req = makeRequest();
      const res = GET(req);

      const setCookie = res.headers.get('set-cookie') ?? '';
      expect(setCookie).toContain('csrf-token=');
    });

    it('Set-Cookie 에 HttpOnly 속성이 포함된다', () => {
      const req = makeRequest();
      const res = GET(req);

      const setCookie = res.headers.get('set-cookie') ?? '';
      expect(setCookie.toLowerCase()).toContain('httponly');
    });

    it('Set-Cookie 에 Max-Age 속성이 포함된다', () => {
      const req = makeRequest();
      const res = GET(req);

      const setCookie = res.headers.get('set-cookie') ?? '';
      expect(setCookie.toLowerCase()).toContain('max-age=7200');
    });

    it('Set-Cookie 에 SameSite=Lax 속성이 포함된다', () => {
      const req = makeRequest();
      const res = GET(req);

      const setCookie = res.headers.get('set-cookie') ?? '';
      expect(setCookie.toLowerCase()).toContain('samesite=lax');
    });

    it('Set-Cookie 에 Path=/ 속성이 포함된다', () => {
      const req = makeRequest();
      const res = GET(req);

      const setCookie = res.headers.get('set-cookie') ?? '';
      expect(setCookie).toContain('Path=/');
    });

    it('응답 쿠키의 값이 JSON 바디의 token과 동일하다', async () => {
      const req = makeRequest();
      const res = GET(req);

      const body = await res.json();
      const cookie = res.cookies.get('csrf-token');
      expect(cookie?.value).toBe(body.token);
    });
  });

  describe('기존 쿠키 재사용 (슬라이딩 만료)', () => {
    const existingToken = 'a'.repeat(64);

    it('기존 csrf-token 쿠키가 있으면 동일한 토큰을 반환한다', async () => {
      const req = makeRequest(`csrf-token=${existingToken}`);
      const res = GET(req);

      const body = await res.json();
      expect(body.token).toBe(existingToken);
    });

    it('기존 쿠키가 있어도 Set-Cookie 로 만료를 갱신한다', () => {
      const req = makeRequest(`csrf-token=${existingToken}`);
      const res = GET(req);

      const setCookie = res.headers.get('set-cookie') ?? '';
      expect(setCookie).toContain(`csrf-token=${existingToken}`);
      expect(setCookie.toLowerCase()).toContain('max-age=7200');
    });

    it('기존 쿠키 재사용 시 응답 쿠키 값이 기존 토큰과 동일하다', () => {
      const req = makeRequest(`csrf-token=${existingToken}`);
      const res = GET(req);

      const cookie = res.cookies.get('csrf-token');
      expect(cookie?.value).toBe(existingToken);
    });
  });

  describe('프로덕션 환경 아닌 경우', () => {
    it('테스트 환경(NODE_ENV=test)에서는 Secure 속성이 없다', () => {
      const req = makeRequest();
      const res = GET(req);

      // NODE_ENV=test → IS_PRODUCTION=false → secure:false → Set-Cookie에 Secure 없음
      const setCookie = res.headers.get('set-cookie') ?? '';
      // Next.js cookies().set은 secure:false일 때 Secure 속성을 포함하지 않는다
      const parts = setCookie.split(';').map((p) => p.trim().toLowerCase());
      expect(parts).not.toContain('secure');
    });
  });
});
