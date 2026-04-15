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
import { AUTH_MESSAGES } from '@/constants/messages';

import { registerStep2Schema, type RegisterStep2Schema } from '../../../schemas/auth.schema';

interface RegisterStep2FormProps {
  onSubmit: (data: RegisterStep2Schema) => void;
}

export function RegisterStep2Form({ onSubmit }: RegisterStep2FormProps) {
  const form = useForm<RegisterStep2Schema>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      username: '',
    },
  });

  return (
    <Form {...form}>
      <form
        key="step2"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{AUTH_MESSAGES.NAME_LABEL}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={AUTH_MESSAGES.USERNAME_PLACEHOLDER}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {AUTH_MESSAGES.CONFIRM}
        </Button>
      </form>
    </Form>
  );
}
