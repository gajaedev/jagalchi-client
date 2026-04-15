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
import { Separator } from '@/components/ui/separator';
import { AUTH_MESSAGES } from '@/constants/messages';

import { useVerificationCode } from '../../../hooks/use-verification-code';
import { registerStep1Schema, type RegisterStep1Schema } from '../../../schemas/auth.schema';
import { GitHubAuthButton } from '../../atoms/GitHubAuthButton';
import { GoogleAuthButton } from '../../atoms/GoogleAuthButton';
import { PasswordInput } from '../../molecules/PasswordInput';
import { VerificationCodeInput } from '../../molecules/VerificationCodeInput';

interface RegisterStep1FormProps {
  onSubmit: (data: RegisterStep1Schema) => void;
  onGoogleRegister: () => void;
  onGitHubRegister?: () => void;
}

export function RegisterStep1Form({
  onSubmit,
  onGoogleRegister,
  onGitHubRegister,
}: RegisterStep1FormProps) {
  const { isCodeSent, handleSendCode, isSendingCode, isCooldownActive, cooldownSeconds } =
    useVerificationCode();

  const form = useForm<RegisterStep1Schema>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: '',
      password: '',
      verificationCode: '',
    },
  });

  const handleResend = () => {
    handleSendCode(form.getValues('email'), () => {
      form.setValue('verificationCode', '');
    });
  };

  const isResendDisabled = isCooldownActive || isSendingCode;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
        <FormField
          control={form.control}
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
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{AUTH_MESSAGES.PASSWORD_LABEL}</FormLabel>
              <FormControl>
                <PasswordInput placeholder={AUTH_MESSAGES.PASSWORD_SET_PLACEHOLDER} {...field} />
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

        <div className="flex flex-col gap-3">
          {isCodeSent ? (
            <Button type="submit" className="w-full">
              {AUTH_MESSAGES.NEXT}
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full"
              disabled={isSendingCode}
              onClick={() => handleSendCode(form.getValues('email'))}
            >
              {isSendingCode
                ? AUTH_MESSAGES.VERIFICATION_CODE_SENDING
                : AUTH_MESSAGES.VERIFICATION_CODE_SEND}
            </Button>
          )}
          <Separator className="my-2" />
          <GoogleAuthButton variant="register" onClick={onGoogleRegister} />
          <GitHubAuthButton variant="register" onClick={onGitHubRegister} />
        </div>
      </form>
    </Form>
  );
}
