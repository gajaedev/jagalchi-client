'use client';

import { forwardRef } from 'react';

import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading = false, loadingText, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={cn(
          'focus:ring-primary-500 bg-primary-500 text-neutral-0 flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-opacity focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-[13.25px] w-[13.25px] animate-spin" aria-hidden="true" />
        )}
        <span>{isLoading && loadingText ? loadingText : children}</span>
      </button>
    );
  },
);

LoadingButton.displayName = 'LoadingButton';
