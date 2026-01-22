'use client';

import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  variant?: 'default' | 'primary';
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ icon, label, isActive = false, variant = 'default', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        aria-pressed={isActive}
        className={cn(
          'group focus:ring-primary-500 relative flex h-10 w-10 items-center justify-center rounded-md transition-colors focus:ring-2 focus:outline-none',
          // Default state
          !isActive && variant === 'default' && 'text-neutral-700 hover:bg-neutral-100',
          // Active state
          isActive && variant === 'default' && 'bg-neutral-100 text-neutral-900',
          // Primary variant
          variant === 'primary' && 'text-primary-500 hover:bg-primary-50',
          isActive && variant === 'primary' && 'bg-primary-50 text-primary-500',
          // Disabled state
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

ToolbarButton.displayName = 'ToolbarButton';
