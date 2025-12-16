import { describe, expect, it } from 'vitest';

import {
  findPasswordStep1Schema,
  findPasswordStep2Schema,
  loginSchema,
  registerStep1Schema,
  registerStep2Schema,
} from '../schemas/auth.schema';

describe('loginSchema', () => {
  it('유효한 이메일과 비밀번호를 통과시킨다', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('이메일이 비어있으면 실패한다', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이메일을 입력해주세요');
    }
  });

  it('이메일 형식이 잘못되면 실패한다', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('올바른 이메일 형식이 아닙니다');
    }
  });

  it('비밀번호가 비어있으면 실패한다', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('비밀번호를 입력해주세요');
    }
  });
});

describe('registerStep1Schema', () => {
  const validData = {
    email: 'test@example.com',
    password: 'Password1!',
    verificationCode: '123456',
  };

  it('유효한 데이터를 통과시킨다', () => {
    const result = registerStep1Schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('비밀번호가 8자 미만이면 실패한다', () => {
    const result = registerStep1Schema.safeParse({
      ...validData,
      password: 'Pass1!',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('8자 이상 영문, 숫자, 기호를 포함해야 합니다');
    }
  });

  it('비밀번호에 영문이 없으면 실패한다', () => {
    const result = registerStep1Schema.safeParse({
      ...validData,
      password: '12345678!',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('8자 이상 영문, 숫자, 기호를 포함해야 합니다');
    }
  });

  it('비밀번호에 숫자가 없으면 실패한다', () => {
    const result = registerStep1Schema.safeParse({
      ...validData,
      password: 'Password!',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('8자 이상 영문, 숫자, 기호를 포함해야 합니다');
    }
  });

  it('비밀번호에 기호가 없으면 실패한다', () => {
    const result = registerStep1Schema.safeParse({
      ...validData,
      password: 'Password1',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('8자 이상 영문, 숫자, 기호를 포함해야 합니다');
    }
  });

  it('인증번호가 비어있으면 실패한다', () => {
    const result = registerStep1Schema.safeParse({
      ...validData,
      verificationCode: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('인증번호를 입력해주세요');
    }
  });
});

describe('registerStep2Schema', () => {
  it('유효한 이름을 통과시킨다', () => {
    const result = registerStep2Schema.safeParse({ username: '홍길동' });
    expect(result.success).toBe(true);
  });

  it('이름이 비어있으면 실패한다', () => {
    const result = registerStep2Schema.safeParse({ username: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이름을 입력해주세요');
    }
  });
});

describe('findPasswordStep1Schema', () => {
  it('유효한 이메일과 인증번호를 통과시킨다', () => {
    const result = findPasswordStep1Schema.safeParse({
      email: 'test@example.com',
      verificationCode: '123456',
    });
    expect(result.success).toBe(true);
  });

  it('이메일이 비어있으면 실패한다', () => {
    const result = findPasswordStep1Schema.safeParse({
      email: '',
      verificationCode: '123456',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('이메일을 입력해주세요');
    }
  });
});

describe('findPasswordStep2Schema', () => {
  const validData = {
    newPassword: 'Password1!',
    passwordConfirm: 'Password1!',
  };

  it('유효한 비밀번호와 확인을 통과시킨다', () => {
    const result = findPasswordStep2Schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('비밀번호가 일치하지 않으면 실패한다', () => {
    const result = findPasswordStep2Schema.safeParse({
      ...validData,
      passwordConfirm: 'DifferentPassword1!',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('비밀번호가 일치하지 않습니다');
    }
  });

  it('비밀번호 확인이 비어있으면 실패한다', () => {
    const result = findPasswordStep2Schema.safeParse({
      ...validData,
      passwordConfirm: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('비밀번호 확인을 입력해주세요');
    }
  });
});
