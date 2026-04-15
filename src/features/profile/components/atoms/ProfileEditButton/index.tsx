'use client';

import { Button } from '@/components/ui/button';
import { PROFILE_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

interface ProfileEditButtonProps {
  variant: 'show' | 'edit';
  className?: string;
  onClick?: () => void;
}

export function ProfileEditButton({ variant, className, onClick }: ProfileEditButtonProps) {
  const label =
    variant === 'show' ? PROFILE_MESSAGES.EDIT_BUTTON_SHOW : PROFILE_MESSAGES.EDIT_BUTTON_EDIT;

  if (variant === 'show') {
    return (
      <Button
        type="button"
        variant="outline"
        className={cn(
          'h-[36px] rounded-lg border-slate-300 px-4 text-sm font-semibold text-slate-950',
          className,
        )}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      className={cn('h-[36px] rounded-lg px-4 text-sm font-semibold', className)}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
