'use client';

import { Button } from '@/components/ui/button';
import { PROFILE_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

interface ProfileLinkAddButtonProps {
  className?: string;
  onClick?: () => void;
  currentCount?: number;
  maxCount?: number;
}

export function ProfileLinkAddButton({
  className,
  onClick,
  currentCount = 0,
  maxCount = 5,
}: ProfileLinkAddButtonProps) {
  const isFull = currentCount >= maxCount;

  return (
    <Button
      type="button"
      disabled={isFull}
      className={cn('w-full font-semibold', className)}
      onClick={onClick}
    >
      {PROFILE_MESSAGES.LINK_ADD_BUTTON}({currentCount}/{maxCount})
    </Button>
  );
}
