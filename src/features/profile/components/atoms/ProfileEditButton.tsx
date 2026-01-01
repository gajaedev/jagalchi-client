'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileEditButtonProps {
  variant: 'show' | 'edit';
  className?: string;
  onClick?: () => void;
}

export function ProfileEditButton({ variant, className, onClick }: ProfileEditButtonProps) {
  const label = variant === 'show' ? '프로필 수정' : '수정 완료';

  return (
    <Button
      type="button"
      variant="outline"
      className={cn('border-border w-full bg-indigo-950 font-semibold text-white', className)}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
