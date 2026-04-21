/**
 * JWT payload를 클라이언트 사이드에서 디코딩하는 유틸리티.
 * 서명 검증 없이 payload만 파싱하므로 표시 용도로만 사용할 것.
 */

interface JwtPayload {
  sub?: string;
  name?: string;
  email?: string;
  exp?: number;
  iat?: number;
}

/**
 * JWT 토큰에서 payload를 디코딩한다.
 * 파싱 실패 시 null 반환.
 */
export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    // base64url → base64 변환
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * JWT 토큰에서 사용자 이름을 추출한다.
 * name claim → sub claim 순서로 시도하고 모두 없으면 null 반환.
 */
export function extractUserNameFromToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  return payload.name ?? payload.sub ?? null;
}
