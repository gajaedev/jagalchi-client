// 로그인
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 Step 1
export interface RegisterStep1FormData {
  email: string;
  password: string;
  verificationCode: string;
}

// 회원가입 Step 2
export interface RegisterStep2FormData {
  username: string;
}

// 회원가입 전체
export interface RegisterFormData extends RegisterStep1FormData, RegisterStep2FormData {}

// 비밀번호 찾기 Step 1
export interface FindPasswordStep1FormData {
  email: string;
  verificationCode: string;
}

// 비밀번호 찾기 Step 2
export interface FindPasswordStep2FormData {
  newPassword: string;
  passwordConfirm: string;
}

// 비밀번호 찾기 전체
export interface FindPasswordFormData
  extends FindPasswordStep1FormData, FindPasswordStep2FormData {}

// Multi-step form state
export type RegisterStep = 1 | 2;
export type FindPasswordStep = 1 | 2;
