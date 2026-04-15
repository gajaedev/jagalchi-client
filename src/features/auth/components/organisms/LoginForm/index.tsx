'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { useForm } from 'react-hook-form';

import { getGithubOAuthUrl, getGoogleOAuthUrl } from '@/api/auth';
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

import { useLogin } from '../../../hooks/use-login';
import { loginSchema, type LoginSchema } from '../../../schemas/auth.schema';
import { loginAtom } from '../../../stores/auth.atoms';
import { GitHubAuthButton } from '../../atoms/GitHubAuthButton';
import { GoogleAuthButton } from '../../atoms/GoogleAuthButton';
import { PasswordInput } from '../../molecules/PasswordInput';

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const setLogin = useSetAtom(loginAtom);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setLogin(response.accessToken);
        router.push('/');
      },
      onError: (error) => {
        form.setError('root', { message: error.message });
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = getGoogleOAuthUrl();
  };

  const handleGitHubLogin = () => {
    window.location.href = getGithubOAuthUrl();
  };

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
                <Input type="email" placeholder={AUTH_MESSAGES.EMAIL_PLACEHOLDER} {...field} />
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
              <div className="flex items-center justify-between">
                <FormLabel>{AUTH_MESSAGES.PASSWORD_LABEL}</FormLabel>
                <Link
                  href="/find-password"
                  className="cursor-pointer text-sm tracking-[0.07px] text-neutral-900 underline transition-colors hover:text-neutral-700"
                >
                  {AUTH_MESSAGES.PASSWORD_FORGOT}
                </Link>
              </div>
              <FormControl>
                <PasswordInput placeholder={AUTH_MESSAGES.PASSWORD_PLACEHOLDER} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
        )}

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? AUTH_MESSAGES.LOGIN_LOADING : AUTH_MESSAGES.LOGIN_LABEL}
          </Button>
          <Separator className="my-2" />
          <GoogleAuthButton variant="login" onClick={handleGoogleLogin} />
          <GitHubAuthButton variant="login" onClick={handleGitHubLogin} />
        </div>
      </form>
    </Form>
  );
}
