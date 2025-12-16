'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { loginSchema, type LoginSchema } from '../../schemas/auth.schema';
import { GoogleAuthButton } from '../atoms/GoogleAuthButton';
import { FormField } from '../molecules/FormField';
import { PasswordInput } from '../molecules/PasswordInput';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (_data: LoginSchema) => {
    // TODO: API 연동
  };

  const handleGoogleLogin = () => {
    // TODO: Google OAuth
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <FormField label="이메일" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          placeholder="이메일 입력"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField
        label="비밀번호"
        htmlFor="password"
        error={errors.password?.message}
        labelExtra={
          <Link
            href="/find-password"
            className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700"
          >
            비밀번호를 잊어버렸나요?
          </Link>
        }
      >
        <PasswordInput
          id="password"
          placeholder="비밀번호 입력"
          error={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full">
          로그인
        </Button>
        <GoogleAuthButton variant="login" onClick={handleGoogleLogin} />
      </div>
    </form>
  );
}
