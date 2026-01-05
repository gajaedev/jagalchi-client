import { client } from '@/lib/api';

import type {
  LoginRequest,
  LoginResponse,
  MessageResponse,
  PasswordResetRequest,
  RefreshTokenRequest,
  RegisterRequest,
  VerifyCodeRequest,
} from '../types/auth.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const authApi = {
  // 로그인
  login: (data: LoginRequest) => client.post<LoginResponse>('/users/auth/login', data),

  // 회원가입
  register: (data: RegisterRequest) => client.post<MessageResponse>('/users', data),

  // 회원가입 인증코드 전송
  sendVerification: (email: string) =>
    client.post<MessageResponse>('/users/verification', { email }),

  // 회원가입 인증코드 검증
  verifyCode: (data: VerifyCodeRequest) =>
    client.patch<MessageResponse>('/users/verification', data),

  // 액세스토큰 재발급
  refreshToken: (data: RefreshTokenRequest) =>
    client.patch<LoginResponse>('/users/auth/refresh', data),

  // 비밀번호 변경 인증코드 전송
  sendPasswordReset: (email: string) =>
    client.post<MessageResponse>('/users/auth/password-reset', { email }),

  // 비밀번호 변경 인증코드 검증
  verifyPasswordReset: (data: VerifyCodeRequest) =>
    client.patch<MessageResponse>('/users/auth/password-reset/verify', data),

  // 비밀번호 변경
  resetPassword: (data: PasswordResetRequest) =>
    client.patch<MessageResponse>('/users/auth/password-reset', data),

  // OAuth URLs
  getGoogleLoginUrl: () => `${API_BASE_URL}/users/auth/login/google`,
  getGithubLoginUrl: () => `${API_BASE_URL}/users/auth/login/github`,
};
