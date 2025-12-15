import { z } from 'zod';

// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email('존재하지 않는 이메일입니다'),
  password: z.string().min(1, '비밀번호가 일치하지 않습니다'),
});

// 회원가입 Step 1 스키마
export const registerStep1Schema = z.object({
  email: z.string().email('올바른 형식의 이메일을 입력해주세요'),
  password: z
    .string()
    .min(8, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
    .regex(/[a-zA-Z]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
    .regex(/[0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
    .regex(/[^a-zA-Z0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다'),
  verificationCode: z.string().min(1, '인증번호가 일치하지 않습니다'),
});

// 회원가입 Step 2 스키마
export const registerStep2Schema = z.object({
  username: z.string().min(1, '사용 불가능한 이름입니다'),
});

// 비밀번호 찾기 Step 1 스키마
export const findPasswordStep1Schema = z.object({
  email: z.string().email('아이디가 존재하지 않는 이메일입니다'),
  verificationCode: z.string().min(1, '인증번호가 일치하지 않습니다'),
});

// 비밀번호 찾기 Step 2 스키마
export const findPasswordStep2Schema = z
  .object({
    newPassword: z
      .string()
      .min(8, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
      .regex(/[a-zA-Z]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
      .regex(/[0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
      .regex(/[^a-zA-Z0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

// 스키마 타입 추출
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterStep1Schema = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Schema = z.infer<typeof registerStep2Schema>;
export type FindPasswordStep1Schema = z.infer<typeof findPasswordStep1Schema>;
export type FindPasswordStep2Schema = z.infer<typeof findPasswordStep2Schema>;
