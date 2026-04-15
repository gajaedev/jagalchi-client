import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export const registerStep1Schema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
    .max(128, '비밀번호는 128자 이하로 입력해주세요')
    .regex(/[a-zA-Z]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
    .regex(/[0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
    .regex(/[^a-zA-Z0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다'),
  verificationCode: z.string().min(1, '인증번호를 입력해주세요'),
});

export const registerStep2Schema = z.object({
  username: z
    .string()
    .min(1, '이름을 입력해주세요')
    .transform((val) => val.trim())
    .pipe(z.string().min(1, '이름을 입력해주세요')),
});

export const registerStep3Schema = z.object({
  link1Name: z.string().optional(),
  link1Url: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
  link2Name: z.string().optional(),
  link2Url: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
  link3Name: z.string().optional(),
  link3Url: z.string().url('올바른 URL 형식이 아닙니다').optional().or(z.literal('')),
});

export const findPasswordStep1Schema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  verificationCode: z.string().min(1, '인증번호를 입력해주세요'),
});

export const findPasswordStep2Schema = z
  .object({
    newPassword: z
      .string()
      .min(1, '비밀번호를 입력해주세요')
      .min(8, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
      .max(128, '비밀번호는 128자 이하로 입력해주세요')
      .regex(/[a-zA-Z]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
      .regex(/[0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다')
      .regex(/[^a-zA-Z0-9]/, '8자 이상 영문, 숫자, 기호를 포함해야 합니다'),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterStep1Schema = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Schema = z.infer<typeof registerStep2Schema>;
export type RegisterStep3Schema = z.infer<typeof registerStep3Schema>;
export type FindPasswordStep1Schema = z.infer<typeof findPasswordStep1Schema>;
export type FindPasswordStep2Schema = z.infer<typeof findPasswordStep2Schema>;
