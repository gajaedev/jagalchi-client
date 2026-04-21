const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

/** cross-origin API일 때만 credentials: include (프록시 환경에선 same-origin) */
const CREDENTIALS = (
  BASE_URL.startsWith('http') ? 'include' : 'same-origin'
) as globalThis.RequestCredentials;

/** 프록시를 통해 요청할 때만 CSRF 검증이 필요하다 */
const IS_PROXY_MODE = !BASE_URL.startsWith('http');

const SAFE_METHODS_SET = new Set(['GET', 'HEAD', 'OPTIONS']);

// --- CSRF Token (in-memory cache, proxy mode only) ---

const CSRF_CACHE_TTL_MS = 90 * 60 * 1000; // 90분 (쿠키 maxAge 2시간보다 짧게)

let csrfToken: string | null = null;
let csrfTokenExpiresAt = 0;
let csrfFetchPromise: Promise<string | null> | null = null;

async function getCsrfToken(): Promise<string | null> {
  if (!IS_PROXY_MODE) return null;
  if (csrfToken && Date.now() < csrfTokenExpiresAt) return csrfToken;

  // 이미 진행 중인 fetch가 있으면 공유 (thundering herd 방지)
  if (csrfFetchPromise) return csrfFetchPromise;

  csrfFetchPromise = (async () => {
    try {
      const response = await fetch('/api/csrf-token', { credentials: 'same-origin' });
      if (!response.ok) return null;
      const data = (await response.json()) as { token: string };
      csrfToken = data.token;
      csrfTokenExpiresAt = Date.now() + CSRF_CACHE_TTL_MS;
      return csrfToken;
    } catch {
      return null;
    } finally {
      csrfFetchPromise = null;
    }
  })();

  return csrfFetchPromise;
}

/** CSRF 토큰 캐시를 초기화한다 (로그아웃 등 세션 전환 시 호출). */
export function resetCsrfToken(): void {
  csrfToken = null;
  csrfTokenExpiresAt = 0;
}

export const SESSION_COOKIE_KEY = 'jagalchi-session';

interface ApiError {
  message: string;
  status: number;
  code?: string;
}

interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor({ message, status, code }: ApiError) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

// --- Token Management (in-memory only) ---

let accessToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

/** 액세스 토큰 저장 (메모리 + 미들웨어용 세션 플래그 쿠키) */
export function setAccessToken(token: string): void {
  accessToken = token;
  if (typeof document !== 'undefined') {
    const secureFlag = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${SESSION_COOKIE_KEY}=1; path=/; SameSite=Strict${secureFlag}`;
  }
}

/** 액세스 토큰 삭제 (메모리 + 세션 쿠키) */
export function clearAccessToken(): void {
  accessToken = null;
  resetCsrfToken();
  if (typeof document !== 'undefined') {
    document.cookie = `${SESSION_COOKIE_KEY}=; path=/; max-age=0`;
  }
}

/** 인증 엔드포인트 여부 (401 시 refresh 스킵) */
const isAuthEndpoint = (endpoint: string): boolean =>
  endpoint.includes('/users/auth/') ||
  endpoint === '/users' ||
  endpoint.includes('/users/verification');

/** 리프레시 토큰으로 새 액세스 토큰 획득 */
async function tryRefreshToken(): Promise<string | null> {
  // 이미 리프레시 중이면 같은 Promise 공유 (중복 요청 방지)
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const url = `${BASE_URL}/users/auth/refresh`;
      const response = await fetch(url, {
        method: 'PATCH',
        credentials: CREDENTIALS, // httpOnly 리프레시 쿠키 자동 전송
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) return null;

      const data = (await response.json()) as { accessToken: string };
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(
  endpoint: string,
  init: {
    method: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
  },
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const token = getAccessToken();
  const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

  const csrfHeader: Record<string, string> = {};
  if (!SAFE_METHODS_SET.has(init.method)) {
    const csrf = await getCsrfToken();
    if (csrf) csrfHeader['X-CSRF-Token'] = csrf;
  }

  const response = await fetch(url, {
    ...init,
    credentials: CREDENTIALS,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
      ...csrfHeader,
      ...init.headers,
    },
  });

  if (!response.ok) {
    // 401 + 비인증 엔드포인트 → refresh 시도 후 재요청
    if (response.status === 401 && !isAuthEndpoint(endpoint)) {
      const newToken = await tryRefreshToken();

      if (newToken) {
        // 새 토큰으로 원래 요청 재시도
        const retryResponse = await fetch(url, {
          ...init,
          credentials: CREDENTIALS,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newToken}`,
            ...csrfHeader,
            ...init.headers,
          },
        });

        if (retryResponse.ok) {
          if (retryResponse.status === 204) return undefined as T;
          const retryText = await retryResponse.text();
          if (!retryText) return undefined as T;
          return JSON.parse(retryText) as T;
        }
      }

      // refresh 실패 → 토큰 클리어 (보호 라우트에서만 리다이렉트)
      clearAccessToken();
      const isProtectedRoute =
        typeof window !== 'undefined' &&
        ['/myroadmap', '/profile', '/editor'].some((r) => window.location.pathname.startsWith(r));
      if (isProtectedRoute) {
        window.location.href = '/login';
      }
      throw new ApiClientError({
        message: '인증이 만료되었습니다',
        status: 401,
        code: 'AUTH_REQUIRED',
      });
    }

    const errorBody = (await response.json().catch(() => ({
      message: '알 수 없는 오류가 발생했습니다',
    }))) as { message: string; code?: string };

    throw new ApiClientError({
      message: errorBody.message,
      status: response.status,
      code: errorBody.code,
    });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export { ApiClientError };
