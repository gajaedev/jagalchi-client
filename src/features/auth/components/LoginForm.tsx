'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { loginSchema, type LoginSchema } from '../schemas/auth.schema';

import { GoogleAuthButton } from './GoogleAuthButton';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    // TODO: API 연동
    console.log('Login:', data);
  };

  const handleGoogleLogin = () => {
    // TODO: Google OAuth
    console.log('Google login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      {/* 이메일 필드 */}
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
        {errors.email && (
          <p role="alert" className="text-destructive text-sm font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 비밀번호 필드 */}
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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호 입력"
            className="pr-10"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        </div>
        {errors.password && (
          <p role="alert" className="text-destructive text-sm font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* 버튼 그룹 */}
      <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full">
          로그인
        </Button>
        <GoogleAuthButton variant="login" onClick={handleGoogleLogin} />
      </div>
    </form>
  );
}
