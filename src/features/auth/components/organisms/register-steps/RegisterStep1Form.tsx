'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useVerificationCode } from '../../../hooks/use-verification-code';
import { registerStep1Schema, type RegisterStep1Schema } from '../../../schemas/auth.schema';
import { GoogleAuthButton } from '../../atoms/GoogleAuthButton';
import { PasswordInput } from '../../molecules/PasswordInput';
import { VerificationCodeInput } from '../../molecules/VerificationCodeInput';

interface RegisterStep1FormProps {
  onSubmit: (data: RegisterStep1Schema) => void;
  onGoogleRegister: () => void;
}

export function RegisterStep1Form({ onSubmit, onGoogleRegister }: RegisterStep1FormProps) {
  const { isCodeSent, handleSendCode } = useVerificationCode();

  const form = useForm<RegisterStep1Schema>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: '',
      password: '',
      verificationCode: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="이메일 입력" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <PasswordInput placeholder="비밀번호 지정" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className={!isCodeSent ? 'text-muted-foreground' : ''}>
                  인증번호
                </FormLabel>
                {isCodeSent && (
                  <button
                    type="button"
                    aria-label="인증번호 재전송"
                    className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700"
                    onClick={handleSendCode}
                  >
                    재전송
                  </button>
                )}
              </div>
              <FormControl>
                <VerificationCodeInput isCodeSent={isCodeSent} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          {isCodeSent ? (
            <Button type="submit" className="w-full">
              다음
            </Button>
          ) : (
            <Button type="button" className="w-full" onClick={handleSendCode}>
              인증번호 전송
            </Button>
          )}
          <GoogleAuthButton variant="register" onClick={onGoogleRegister} />
        </div>
      </form>
    </Form>
  );
}
