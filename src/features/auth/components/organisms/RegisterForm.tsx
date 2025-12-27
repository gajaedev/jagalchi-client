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
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
  type RegisterStep1Schema,
  type RegisterStep2Schema,
  type RegisterStep3Schema,
} from '../../schemas/auth.schema';
import { GoogleAuthButton } from '../atoms/GoogleAuthButton';
import { PasswordInput } from '../molecules/PasswordInput';
import { VerificationCodeInput } from '../molecules/VerificationCodeInput';

import type { RegisterStep } from '../../types/auth.types';

interface RegisterFormProps {
  onStepChange?: (step: RegisterStep, title: string, description: string) => void;
}

export function RegisterForm({ onStepChange }: RegisterFormProps) {
  const [step, setStep] = useState<RegisterStep>(1);
  const { isCodeSent, handleSendCode } = useVerificationCode();

  const step1Form = useForm<RegisterStep1Schema>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: '',
      password: '',
      verificationCode: '',
    },
  });

  const step2Form = useForm<RegisterStep2Schema>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      username: '',
    },
  });

  const step3Form = useForm<RegisterStep3Schema>({
    resolver: zodResolver(registerStep3Schema),
    defaultValues: {
      link1Name: '',
      link1Url: '',
      link2Name: '',
      link2Url: '',
      link3Name: '',
      link3Url: '',
    },
  });

  const onStep1Submit = (_data: RegisterStep1Schema) => {
    // TODO: API 연동 - 이메일 인증 확인
    setStep(2);
    onStepChange?.(2, '사용자 이름 설정', '사용자 이름을 입력해주세요');
  };

  const onStep2Submit = (_data: RegisterStep2Schema) => {
    setStep(3);
    onStepChange?.(3, '유저 프로필 링크 추가', '유저 프로필에 표시할 링크를 입력해주세요');
  };

  const onStep3Submit = (_data: RegisterStep3Schema) => {
    // TODO: API 연동 - 회원가입 완료
  };

  const handleSkip = () => {
    // TODO: API 연동 - 링크 없이 회원가입 완료
  };

  const handleGoogleRegister = () => {
    // TODO: Google OAuth
  };

  if (step === 3) {
    return (
      <Form {...step3Form}>
        <form
          key="step3"
          onSubmit={step3Form.handleSubmit(onStep3Submit)}
          noValidate
          className="flex flex-col gap-7"
        >
          <div className="flex flex-col gap-7">
            {/* 1번 링크 */}
            <div className="flex flex-col gap-1.5">
              <FormField
                control={step3Form.control}
                name="link1Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1번 링크</FormLabel>
                    <div className="flex gap-1.5">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="링크 이름"
                          className="w-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormField
                        control={step3Form.control}
                        name="link1Url"
                        render={({ field: urlField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input type="url" placeholder="링크 URL" {...urlField} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step3Form.control}
                name="link1Url"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 2번 링크 */}
            <div className="flex flex-col gap-1.5">
              <FormField
                control={step3Form.control}
                name="link2Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2번 링크</FormLabel>
                    <div className="flex gap-1.5">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="링크 이름"
                          className="w-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormField
                        control={step3Form.control}
                        name="link2Url"
                        render={({ field: urlField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input type="url" placeholder="링크 URL" {...urlField} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step3Form.control}
                name="link2Url"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 3번 링크 */}
            <div className="flex flex-col gap-1.5">
              <FormField
                control={step3Form.control}
                name="link3Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3번 링크</FormLabel>
                    <div className="flex gap-1.5">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="링크 이름"
                          className="w-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormField
                        control={step3Form.control}
                        name="link3Url"
                        render={({ field: urlField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input type="url" placeholder="링크 URL" {...urlField} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step3Form.control}
                name="link3Url"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              확인
            </Button>
            <Button type="button" variant="secondary" className="w-full" onClick={handleSkip}>
              건너뛰기
            </Button>
          </div>
        </form>
      </Form>
    );
  }

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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="사용자 이름 입력" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            확인
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
          <GoogleAuthButton variant="register" onClick={handleGoogleRegister} />
        </div>
      </form>
    </Form>
  );
}
