export type RegisterStep = 1 | 2 | 3;
export type FindPasswordStep = 1 | 2;

// Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface VerificationRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface PasswordResetRequest {
  email: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Response Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface MessageResponse {
  message: string;
}
