import { NextRequest, NextResponse } from 'next/server';

import { timingSafeEqual } from 'crypto';

const API_ORIGIN = process.env.API_ORIGIN ?? 'https://api.jagalchi.dev';
const DEFAULT_TIMEOUT_MS = 15_000;
const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * 허용할 origin 목록.
 * NEXT_PUBLIC_SITE_URL 환경 변수가 없으면 프로덕션 도메인을 기본값으로 사용한다.
 * 개발 환경에서는 localhost 3000 포트를 추가로 허용한다.
 */
function buildAllowedOrigins(): Set<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jagalchi.dev';
  // trailing slash 제거 후 origin만 추출
  const normalized = siteUrl.replace(/\/$/, '');
  const origins = new Set([normalized]);

  if (!IS_PRODUCTION) {
    origins.add('http://localhost:3000');
  }

  return origins;
}

const ALLOWED_ORIGINS = buildAllowedOrigins();

// ---------------------------------------------------------------------------
// 헬퍼 함수
// ---------------------------------------------------------------------------

/**
 * 응답 헤더에서 CORS 관련 헤더를 제거한다 (same-origin 프록시이므로 불필요).
 */
function stripCorsHeaders(headers: Headers) {
  headers.delete('access-control-allow-origin');
  headers.delete('access-control-allow-credentials');
  headers.delete('access-control-allow-methods');
  headers.delete('access-control-allow-headers');
}

/**
 * 요청 헤더에서 프록시 홉 바이 홉 헤더, host, CSRF 헤더, 포워딩 헤더를 제거한다.
 * - CSRF 헤더: 검증 후 업스트림에 노출 불필요
 * - x-forwarded-*: 클라이언트 조작으로 업스트림 IP 스푸핑 방지
 */
function sanitizeRequestHeaders(source: Headers): Headers {
  const headers = new Headers(source);
  headers.delete('host');
  headers.delete('connection');
  headers.delete('content-length');
  headers.delete(CSRF_HEADER_NAME);
  headers.delete('x-forwarded-for');
  headers.delete('x-forwarded-host');
  headers.delete('x-forwarded-proto');
  headers.delete('x-real-ip');
  headers.delete('forwarded');
  return headers;
}

/**
 * 두 문자열을 timing-safe 하게 비교한다.
 * 길이가 다르면 false 를 즉시 반환한다 (단락 없이 상수 시간 보장).
 */
function timingSafeStringEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Origin 헤더 기반으로 same-origin 여부를 검증한다.
 * 상태 변경 요청에서 브라우저는 항상 Origin을 전송하므로 Referer 폴백은 사용하지 않는다.
 * (Referer 폴백은 스푸핑 가능성이 있어 공격면 확대)
 */
function verifyOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin);
}

/**
 * CSRF 이중 제출 패턴 검증.
 * `csrf-token` 쿠키 값과 `X-CSRF-Token` 헤더 값을 timing-safe 하게 비교한다.
 */
function verifyCsrfToken(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken) return false;

  return timingSafeStringEqual(cookieToken, headerToken);
}

// ---------------------------------------------------------------------------
// 403 응답 공장
// ---------------------------------------------------------------------------

function forbidden(code: string, message: string): NextResponse {
  return NextResponse.json({ code, message }, { status: 403 });
}

// ---------------------------------------------------------------------------
// 프록시 핸들러
// ---------------------------------------------------------------------------

async function proxyRequest(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api/, '');
  const targetUrl = `${API_ORIGIN}${targetPath}${search}`;

  // safe 메서드(GET/HEAD/OPTIONS)는 CSRF 검증 스킵
  if (!SAFE_METHODS.has(request.method)) {
    // 1단계: Origin / Referer 동일 출처 검증
    if (!verifyOrigin(request)) {
      return forbidden('CSRF_ORIGIN_MISMATCH', 'Request origin is not allowed');
    }

    // 2단계: CSRF 토큰 이중 제출 검증
    if (!verifyCsrfToken(request)) {
      return forbidden('CSRF_TOKEN_INVALID', 'CSRF token is missing or invalid');
    }
  }

  const headers = sanitizeRequestHeaders(request.headers);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    // eslint-disable-next-line no-undef
    const init: RequestInit & { duplex?: 'half' } = {
      method: request.method,
      headers,
      signal: controller.signal,
    };

    // GET/HEAD/OPTIONS 는 바디를 포함할 수 없다.
    if (!SAFE_METHODS.has(request.method)) {
      init.body = request.body;
      init.duplex = 'half';
    }

    const response = await fetch(targetUrl, init);

    const responseHeaders = new Headers(response.headers);
    stripCorsHeaders(responseHeaders);

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { code: 'GATEWAY_TIMEOUT', message: 'Upstream request timed out' },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { code: 'BAD_GATEWAY', message: 'Failed to reach upstream' },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
