import { NextRequest, NextResponse } from 'next/server';

const API_ORIGIN = process.env.API_ORIGIN ?? 'https://api.jagalchi.dev';

async function proxyRequest(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  // /api/users/auth/login → https://api.jagalchi.dev/users/auth/login
  const targetPath = pathname.replace(/^\/api/, '');
  const targetUrl = `${API_ORIGIN}${targetPath}${search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.body,
    // @ts-expect-error duplex needed for streaming body
    duplex: 'half',
  });

  const responseHeaders = new Headers(response.headers);
  // CORS 헤더 제거 (same-origin 프록시이므로 불필요)
  responseHeaders.delete('access-control-allow-origin');
  responseHeaders.delete('access-control-allow-credentials');
  responseHeaders.delete('access-control-allow-methods');
  responseHeaders.delete('access-control-allow-headers');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
