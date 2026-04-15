'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

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
import { AUTH_MESSAGES } from '@/constants/messages';

import { usePasswordResetCode } from '../../hooks/use-password-reset-code';
import { useResetPassword } from '../../hooks/use-reset-password';
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
  const router = useRouter();
  const [step, setStep] = useState<FindPasswordStep>(1);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const {
    isCodeSent,
    handleSendCode,
    handleVerifyCode,
    isSendingCode,
    isCooldownActive,
    cooldownSeconds,
  } = usePasswordResetCode();
  const resetPasswordMutation = useResetPassword();

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

  const onStep1Submit = async (data: FindPasswordStep1Schema) => {
    try {
      await handleVerifyCode(data.email, data.verificationCode);
      setVerifiedEmail(data.email);
      setStep(2);
      onStepChange?.(
        2,
        AUTH_MESSAGES.FIND_PASSWORD_STEP2_TITLE,
        AUTH_MESSAGES.FIND_PASSWORD_STEP2_DESCRIPTION,
      );
    } catch (error) {
      step1Form.setError('verificationCode', {
        message: error instanceof Error ? error.message : AUTH_MESSAGES.VERIFICATION_FAILED,
      });
    }
  };

  const onStep2Submit = (data: FindPasswordStep2Schema) => {
    resetPasswordMutation.mutate(
      { email: verifiedEmail, newPassword: data.newPassword },
      {
        onSuccess: () => {
          router.push('/login');
        },
        onError: (error) => {
          step2Form.setError('root', { message: error.message });
        },
      },
    );
  };

  const handleResend = () => {
    handleSendCode(step1Form.getValues('email'), () => {
      step1Form.setValue('verificationCode', '');
    });
  };

  const isResendDisabled = isCooldownActive || isSendingCode;

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
                <FormLabel>{AUTH_MESSAGES.NEW_PASSWORD_LABEL}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={AUTH_MESSAGES.PASSWORD_PLACEHOLDER}
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
                <FormLabel>{AUTH_MESSAGES.PASSWORD_CONFIRM_LABEL}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={AUTH_MESSAGES.PASSWORD_CONFIRM_PLACEHOLDER}
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {step2Form.formState.errors.root && (
            <p className="text-destructive text-sm">{step2Form.formState.errors.root.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={resetPasswordMutation.isPending}>
            {resetPasswordMutation.isPending ? AUTH_MESSAGES.PROCESSING : AUTH_MESSAGES.COMPLETE}
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
              <FormLabel>{AUTH_MESSAGES.EMAIL_LABEL}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={AUTH_MESSAGES.EMAIL_PLACEHOLDER}
                  disabled={isCodeSent}
                  {...field}
                />
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
                  {AUTH_MESSAGES.VERIFICATION_CODE_LABEL}
                </FormLabel>
                {isCodeSent && (
                  <button
                    type="button"
                    aria-label={AUTH_MESSAGES.VERIFICATION_CODE_RESEND_ARIA}
                    disabled={isResendDisabled}
                    className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-400 disabled:no-underline"
                    onClick={handleResend}
                  >
                    {isCooldownActive
                      ? `${cooldownSeconds}${AUTH_MESSAGES.VERIFICATION_CODE_RESEND_COOLDOWN}`
                      : AUTH_MESSAGES.VERIFICATION_CODE_RESEND}
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
            {AUTH_MESSAGES.NEXT}
          </Button>
        ) : (
          <Button
            type="button"
            className="w-full"
            disabled={isSendingCode}
            onClick={() => handleSendCode(step1Form.getValues('email'))}
          >
            {isSendingCode
              ? AUTH_MESSAGES.VERIFICATION_CODE_SENDING
              : AUTH_MESSAGES.VERIFICATION_CODE_SEND}
          </Button>
        )}
      </form>
    </Form>
  );
}
