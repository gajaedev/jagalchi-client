import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./client', () => ({
  apiClient: {
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    get: vi.fn(),
  },
}));

import { apiClient } from './client';
import {
  login,
  signUp,
  sendVerificationCode,
  verifyCode,
  sendPasswordResetCode,
  verifyPasswordResetCode,
  resetPassword,
  refreshToken,
  deleteAccount,
  getGoogleOAuthUrl,
  getGithubOAuthUrl,
} from './auth';

describe('auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('login calls POST /users/auth/login', () => {
    login({ email: 'a@b.com', password: '1234' });
    expect(apiClient.post).toHaveBeenCalledWith('/users/auth/login', {
      email: 'a@b.com',
      password: '1234',
    });
  });

  it('signUp calls POST /users', () => {
    signUp({ email: 'a@b.com', name: 'test', password: '1234' });
    expect(apiClient.post).toHaveBeenCalledWith('/users', {
      email: 'a@b.com',
      name: 'test',
      password: '1234',
    });
  });

  it('sendVerificationCode calls POST /users/verification', () => {
    sendVerificationCode({ email: 'a@b.com' });
    expect(apiClient.post).toHaveBeenCalledWith('/users/verification', { email: 'a@b.com' });
  });

  it('verifyCode calls PATCH /users/verification', () => {
    verifyCode({ email: 'a@b.com', code: '123456' });
    expect(apiClient.patch).toHaveBeenCalledWith('/users/verification', {
      email: 'a@b.com',
      code: '123456',
    });
  });

  it('sendPasswordResetCode calls POST /users/auth/password-reset', () => {
    sendPasswordResetCode({ email: 'a@b.com' });
    expect(apiClient.post).toHaveBeenCalledWith('/users/auth/password-reset', {
      email: 'a@b.com',
    });
  });

  it('verifyPasswordResetCode calls PATCH /users/auth/password-reset/verify', () => {
    verifyPasswordResetCode({ email: 'a@b.com', code: '123456' });
    expect(apiClient.patch).toHaveBeenCalledWith('/users/auth/password-reset/verify', {
      email: 'a@b.com',
      code: '123456',
    });
  });

  it('resetPassword calls PATCH /users/auth/password-reset', () => {
    resetPassword({ email: 'a@b.com', newPassword: 'newpass' });
    expect(apiClient.patch).toHaveBeenCalledWith('/users/auth/password-reset', {
      email: 'a@b.com',
      newPassword: 'newpass',
    });
  });

  it('refreshToken calls PATCH /users/auth/refresh', () => {
    refreshToken();
    expect(apiClient.patch).toHaveBeenCalledWith('/users/auth/refresh');
  });

  it('deleteAccount calls DELETE /users', () => {
    deleteAccount();
    expect(apiClient.delete).toHaveBeenCalledWith('/users');
  });

  it('getGoogleOAuthUrl returns correct URL', () => {
    const url = getGoogleOAuthUrl();
    expect(url).toContain('/users/auth/login/google');
  });

  it('getGithubOAuthUrl returns correct URL', () => {
    const url = getGithubOAuthUrl();
    expect(url).toContain('/users/auth/login/github');
  });
});
