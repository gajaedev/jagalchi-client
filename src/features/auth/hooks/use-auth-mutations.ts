'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { authApi } from '../api/auth.api';

import type {
  LoginRequest,
  LoginResponse,
  MessageResponse,
  PasswordResetRequest,
  RegisterRequest,
  VerifyCodeRequest,
} from '../types/auth.types';

export function useLogin() {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: () => {
      router.push('/');
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation<MessageResponse, Error, RegisterRequest>({
    mutationFn: authApi.register,
    onSuccess: () => {
      router.push('/login');
    },
  });
}

export function useSendVerification() {
  return useMutation<MessageResponse, Error, string>({
    mutationFn: authApi.sendVerification,
  });
}

export function useVerifyCode() {
  return useMutation<MessageResponse, Error, VerifyCodeRequest>({
    mutationFn: authApi.verifyCode,
  });
}

export function useSendPasswordReset() {
  return useMutation<MessageResponse, Error, string>({
    mutationFn: authApi.sendPasswordReset,
  });
}

export function useVerifyPasswordReset() {
  return useMutation<MessageResponse, Error, VerifyCodeRequest>({
    mutationFn: authApi.verifyPasswordReset,
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation<MessageResponse, Error, PasswordResetRequest>({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      router.push('/login');
    },
  });
}
