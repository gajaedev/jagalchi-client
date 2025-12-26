'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfileLinkAddButtonProps {
  className?: string;
  onClick?: () => void;
}

export function ProfileLinkAddButton({ className, onClick }: ProfileLinkAddButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn('border-border w-full !bg-indigo-950 font-semibold !text-white', className)}
      onClick={onClick}
    >
      링크추가(3/5)
    </Button>
  );
}
