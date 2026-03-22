'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileEditButtonProps {
  variant: 'show' | 'edit';
  className?: string;
  onClick?: () => void;
}

export function ProfileEditButton({ variant, className, onClick }: ProfileEditButtonProps) {
  const label = variant === 'show' ? '편집하기' : '편집 모드 나가기';

  if (variant === 'show') {
    return (
      <Button
        type="button"
        variant="outline"
        className={cn(
          'h-[36px] rounded-lg border-[#cbd5e1] px-4 text-sm font-semibold text-[#020617]',
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
