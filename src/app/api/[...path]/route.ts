import { NextRequest, NextResponse } from 'next/server';

const API_ORIGIN = process.env.API_ORIGIN ?? 'https://api.jagalchi.dev';
const DEFAULT_TIMEOUT_MS = 15_000;

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

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
 * 요청 헤더에서 프록시 홉 바이 홉 헤더와 host 를 제거한다.
 */
function sanitizeRequestHeaders(source: Headers): Headers {
  const headers = new Headers(source);
  headers.delete('host');
  headers.delete('connection');
  headers.delete('content-length');
  return headers;
}

async function proxyRequest(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api/, '');
  const targetUrl = `${API_ORIGIN}${targetPath}${search}`;

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
