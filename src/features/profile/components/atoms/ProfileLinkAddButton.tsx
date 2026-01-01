'use client';

import { Button } from '@/components/ui/button';
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
      variant="outline"
      disabled={isFull}
      className={cn(
        'border-border bg-primary text-primary-foreground w-full font-semibold',
        className,
      )}
      onClick={onClick}
    >
      링크추가({currentCount}/{maxCount})
    </Button>
  );
}
