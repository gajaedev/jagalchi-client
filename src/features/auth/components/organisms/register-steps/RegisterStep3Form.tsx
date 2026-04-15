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

import { registerStep3Schema, type RegisterStep3Schema } from '../../../schemas/auth.schema';

interface RegisterStep3FormProps {
  onSubmit: (data: RegisterStep3Schema) => void;
  onSkip: () => void;
}

const LINK_FIELDS = [
  {
    nameField: 'link1Name' as const,
    urlField: 'link1Url' as const,
    label: AUTH_MESSAGES.LINK_LABEL_1,
  },
  {
    nameField: 'link2Name' as const,
    urlField: 'link2Url' as const,
    label: AUTH_MESSAGES.LINK_LABEL_2,
  },
  {
    nameField: 'link3Name' as const,
    urlField: 'link3Url' as const,
    label: AUTH_MESSAGES.LINK_LABEL_3,
  },
];

export function RegisterStep3Form({ onSubmit, onSkip }: RegisterStep3FormProps) {
  const form = useForm<RegisterStep3Schema>({
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

  return (
    <Form {...form}>
      <form
        key="step3"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-7"
      >
        <div className="flex flex-col gap-7">
          {LINK_FIELDS.map(({ nameField, urlField, label }) => (
            <div key={nameField} className="flex flex-col gap-1.5">
              <FormField
                control={form.control}
                name={nameField}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex gap-1.5">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={AUTH_MESSAGES.LINK_NAME_PLACEHOLDER}
                          className="w-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormField
                        control={form.control}
                        name={urlField}
                        render={({ field: urlField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                type="url"
                                placeholder={AUTH_MESSAGES.LINK_URL_PLACEHOLDER}
                                {...urlField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            {AUTH_MESSAGES.CONFIRM}
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={onSkip}>
            {AUTH_MESSAGES.SKIP}
          </Button>
        </div>
      </form>
    </Form>
  );
}
