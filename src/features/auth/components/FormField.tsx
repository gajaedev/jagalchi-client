'use client';

import { Label } from '@/components/ui/label';

import { FormErrorMessage } from './FormErrorMessage';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  labelExtra?: React.ReactNode;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, labelExtra, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </Label>
        {labelExtra}
      </div>
      {children}
      <FormErrorMessage message={error} />
    </div>
  );
}
