'use client';

import { forwardRef, useId } from 'react';

import { cn } from '@/lib/utils';

interface EditorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const EditorInput = forwardRef<HTMLInputElement, EditorInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs font-medium text-neutral-700" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'focus:border-primary-500 focus:ring-primary-500 h-9 rounded-md border border-neutral-300 px-3 py-2 text-sm placeholder:text-neutral-400 focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

EditorInput.displayName = 'EditorInput';
