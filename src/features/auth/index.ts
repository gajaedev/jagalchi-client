// Components
export { AuthCard } from './components/templates/AuthCard';
export { GoogleAuthButton } from './components/atoms/GoogleAuthButton';
export { PasswordInput } from './components/molecules/PasswordInput';
export { VerificationCodeInput } from './components/molecules/VerificationCodeInput';
export { LoginForm } from './components/organisms/LoginForm';
export { RegisterForm } from './components/organisms/RegisterForm';
export { FindPasswordForm } from './components/organisms/FindPasswordForm';

// API
export { authApi } from './api/auth.api';

// Hooks
export {
  useLogin,
  useRegister,
  useSendVerification,
  useVerifyCode,
  useSendPasswordReset,
  useVerifyPasswordReset,
  useResetPassword,
} from './hooks/use-auth-mutations';
export { useVerificationCode } from './hooks/use-verification-code';

// Types
export type {
  RegisterStep,
  FindPasswordStep,
  LoginRequest,
  RegisterRequest,
  VerificationRequest,
  VerifyCodeRequest,
  PasswordResetRequest,
  RefreshTokenRequest,
  AuthTokens,
  User,
  LoginResponse,
  MessageResponse,
} from './types/auth.types';

// Schemas
export type {
  LoginSchema,
  RegisterStep1Schema,
  RegisterStep2Schema,
  FindPasswordStep1Schema,
  FindPasswordStep2Schema,
} from './schemas/auth.schema';

export {
  loginSchema,
  registerStep1Schema,
  registerStep2Schema,
  findPasswordStep1Schema,
  findPasswordStep2Schema,
} from './schemas/auth.schema';
