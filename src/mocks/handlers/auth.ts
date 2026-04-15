import { http, HttpResponse } from 'msw';

import {
  createMockToken,
  MOCK_USERS,
  MOCK_VERIFICATION_CODE,
  type MockUser,
} from '../fixtures/users';

// === Request/Response Types ===

interface LoginRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  name: string;
  password: string;
}

interface SendVerificationCodeRequest {
  email: string;
}

interface VerifyCodeRequest {
  email: string;
  code: string;
}

interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
  path: string;
}

// 가변 유저 저장소 (등록된 유저를 런타임에서 추적)
const registeredUsers: MockUser[] = [...MOCK_USERS];

/** API 스펙 형식의 에러 응답 생성 */
const createErrorResponse = (
  status: number,
  code: string,
  message: string,
  path: string,
): ErrorResponse => ({
  timestamp: new Date().toISOString(),
  status,
  error:
    (
      {
        400: 'Bad Request',
        401: 'Unauthorized',
        404: 'Not Found',
        429: 'Too Many Requests',
      } as Record<number, string>
    )[status] ?? 'Internal Server Error',
  code,
  message,
  path,
});

/** 이메일+인증코드 검증 공통 헬퍼 */
function verifyCode(
  email: string | undefined,
  code: string | undefined,
  path: string,
): HttpResponse<ErrorResponse> | null {
  if (!email || !code) {
    return HttpResponse.json(
      createErrorResponse(400, 'INVALID_INPUT', '이메일과 인증 코드를 입력해주세요', path),
      { status: 400 },
    );
  }
  if (code !== MOCK_VERIFICATION_CODE) {
    return HttpResponse.json(
      createErrorResponse(400, 'VALIDATION_FAILED', '인증 코드가 올바르지 않습니다', path),
      { status: 400 },
    );
  }
  return null;
}

/** Auth API 핸들러 (endpoints aligned with docs/api.md) */
export const authHandlers = [
  // POST /api/users/auth/login
  http.post<Record<string, never>, LoginRequest>('/api/users/auth/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    // Rate limit 시나리오
    if (email === 'ratelimit@example.com') {
      return HttpResponse.json(
        createErrorResponse(
          429,
          'TOO_MANY_REQUESTS',
          '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
          '/users/auth/login',
        ),
        { status: 429 },
      );
    }

    const user = registeredUsers.find((u) => u.email === email);

    if (!user || user.password !== password) {
      return HttpResponse.json(
        createErrorResponse(
          401,
          'UNAUTHORIZED',
          '이메일 또는 비밀번호가 올바르지 않습니다',
          '/users/auth/login',
        ),
        { status: 401 },
      );
    }

    return HttpResponse.json({ accessToken: createMockToken(user.id) });
  }),

  // POST /api/users
  http.post<Record<string, never>, SignUpRequest>('/api/users', async ({ request }) => {
    const body = await request.json();
    const { email, name, password } = body;

    const existingUser = registeredUsers.find((u) => u.email === email);

    if (existingUser) {
      return HttpResponse.json(
        createErrorResponse(400, 'INVALID_INPUT', '이미 등록된 이메일입니다', '/users'),
        { status: 400 },
      );
    }

    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      username: name,
      links: [],
      createdAt: new Date().toISOString(),
    };

    registeredUsers.push(newUser);

    return HttpResponse.json(
      { id: registeredUsers.length, email: newUser.email, name: newUser.username },
      { status: 201 },
    );
  }),

  // POST /api/users/verification — 인증코드 전송
  http.post<Record<string, never>, SendVerificationCodeRequest>(
    '/api/users/verification',
    async ({ request }) => {
      const body = await request.json();
      const { email } = body;

      if (!email) {
        return HttpResponse.json(
          createErrorResponse(400, 'INVALID_INPUT', '이메일을 입력해주세요', '/users/verification'),
          { status: 400 },
        );
      }

      return HttpResponse.json({ message: '인증 코드가 발송되었습니다' });
    },
  ),

  // PATCH /api/users/verification — 인증코드 확인
  http.patch<Record<string, never>, VerifyCodeRequest>(
    '/api/users/verification',
    async ({ request }) => {
      const { email, code } = await request.json();
      return (
        verifyCode(email, code, '/users/verification') ??
        HttpResponse.json({ message: '인증 완료' })
      );
    },
  ),

  // POST /api/users/auth/password-reset — 비밀번호 리셋 코드 전송
  http.post<Record<string, never>, SendVerificationCodeRequest>(
    '/api/users/auth/password-reset',
    async ({ request }) => {
      const body = await request.json();
      const { email } = body;

      if (!email) {
        return HttpResponse.json(
          createErrorResponse(
            400,
            'INVALID_INPUT',
            '이메일을 입력해주세요',
            '/users/auth/password-reset',
          ),
          { status: 400 },
        );
      }

      return HttpResponse.json({ message: '비밀번호 리셋 코드가 발송되었습니다' });
    },
  ),

  // PATCH /api/users/auth/password-reset/verify — 비밀번호 리셋 코드 확인
  http.patch<Record<string, never>, VerifyCodeRequest>(
    '/api/users/auth/password-reset/verify',
    async ({ request }) => {
      const { email, code } = await request.json();
      return (
        verifyCode(email, code, '/users/auth/password-reset/verify') ??
        HttpResponse.json({ message: '인증 완료' })
      );
    },
  ),

  // PATCH /api/users/auth/password-reset — 비밀번호 변경
  http.patch<Record<string, never>, ResetPasswordRequest>(
    '/api/users/auth/password-reset',
    async ({ request }) => {
      const body = await request.json();
      const { email, newPassword } = body;

      const user = registeredUsers.find((u) => u.email === email);

      if (!user) {
        return HttpResponse.json(
          createErrorResponse(
            404,
            'NOT_FOUND',
            '등록되지 않은 이메일입니다',
            '/users/auth/reset-password',
          ),
          { status: 404 },
        );
      }

      user.password = newPassword;

      return HttpResponse.json({ message: '비밀번호가 변경되었습니다' });
    },
  ),

  // PATCH /api/users/auth/refresh — 토큰 갱신
  // 세션 쿠키가 있어야만 토큰 갱신 성공 (로그인 후 설정됨)
  http.patch('/api/users/auth/refresh', ({ cookies }) => {
    if (!cookies['jagalchi-session']) {
      return HttpResponse.json(
        createErrorResponse(401, 'UNAUTHORIZED', '인증이 만료되었습니다', '/users/auth/refresh'),
        { status: 401 },
      );
    }
    return HttpResponse.json({ accessToken: createMockToken('refreshed') });
  }),

  // DELETE /api/users — 계정 삭제
  http.delete('/api/users', ({ request }) => {
    if (!request.headers.get('Authorization')) {
      return HttpResponse.json(
        createErrorResponse(401, 'UNAUTHORIZED', '인증이 필요합니다', '/users'),
        { status: 401 },
      );
    }
    return new HttpResponse(null, { status: 204 });
  }),
];

// 테스트에서 사용자 목록 초기화할 때 사용
export const resetRegisteredUsers = (): void => {
  registeredUsers.length = 0;
  registeredUsers.push(...MOCK_USERS);
};
