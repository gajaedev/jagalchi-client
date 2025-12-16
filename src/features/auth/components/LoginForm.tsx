'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { loginSchema, type LoginSchema } from '../schemas/auth.schema';

import { FormErrorMessage } from './FormErrorMessage';
import { GoogleAuthButton } from './GoogleAuthButton';
import { PasswordInput } from './PasswordInput';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    // TODO: API 연동
    void data;
  };

  const handleGoogleLogin = () => {
    // TODO: Google OAuth
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-sm font-medium">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일 입력"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        <FormErrorMessage message={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            비밀번호
          </Label>
          <Link
            href="/find-password"
            className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700"
          >
            비밀번호를 잊어버렸나요?
          </Link>
        </div>
        <PasswordInput
          id="password"
          placeholder="비밀번호 입력"
          error={!!errors.password}
          {...register('password')}
        />
        <FormErrorMessage message={errors.password?.message} />
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full">
          로그인
        </Button>
        <GoogleAuthButton variant="login" onClick={handleGoogleLogin} />
      </div>
    </form>
  );
}
