'use client';

import { useState } from 'react';

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

import { useVerificationCode } from '../../hooks/use-verification-code';
import {
  findPasswordStep1Schema,
  findPasswordStep2Schema,
  type FindPasswordStep1Schema,
  type FindPasswordStep2Schema,
} from '../../schemas/auth.schema';
import { PasswordInput } from '../molecules/PasswordInput';
import { VerificationCodeInput } from '../molecules/VerificationCodeInput';

import type { FindPasswordStep } from '../../types/auth.types';

interface FindPasswordFormProps {
  onStepChange?: (step: FindPasswordStep, title: string, description: string) => void;
}

export function FindPasswordForm({ onStepChange }: FindPasswordFormProps) {
  const [step, setStep] = useState<FindPasswordStep>(1);
  const { isCodeSent, handleSendCode } = useVerificationCode();

  const step1Form = useForm<FindPasswordStep1Schema>({
    resolver: zodResolver(findPasswordStep1Schema),
    defaultValues: {
      email: '',
      verificationCode: '',
    },
  });

  const step2Form = useForm<FindPasswordStep2Schema>({
    resolver: zodResolver(findPasswordStep2Schema),
    defaultValues: {
      newPassword: '',
      passwordConfirm: '',
    },
  });

  const onStep1Submit = (_data: FindPasswordStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    setStep(2);
    onStepChange?.(2, '새 비밀번호 입력', '재설정할 비밀번호를 입력해주세요');
  };

  const onStep2Submit = (_data: FindPasswordStep2Schema) => {
    // TODO: API 연동 - 비밀번호 재설정
  };

  if (step === 2) {
    return (
      <Form {...step2Form}>
        <form
          key="step2"
          onSubmit={step2Form.handleSubmit(onStep2Submit)}
          noValidate
          className="flex flex-col gap-7"
        >
          <FormField
            control={step2Form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 비밀번호</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="비밀번호 입력"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={step2Form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="비밀번호 다시 입력"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            완료
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...step1Form}>
      <form
        onSubmit={step1Form.handleSubmit(onStep1Submit)}
        noValidate
        className="flex flex-col gap-7"
      >
        <FormField
          control={step1Form.control}
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
          control={step1Form.control}
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

        {isCodeSent ? (
          <Button type="submit" className="w-full">
            다음
          </Button>
        ) : (
          <Button type="button" className="w-full" onClick={handleSendCode}>
            인증번호 전송
          </Button>
        )}
      </form>
    </Form>
  );
}
