'use client';

import { forwardRef } from 'react';

import { Loader2 } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface EditorButtonProps extends ButtonProps {
  /** If true, shows a loading spinner on the button */
  isLoading?: boolean;
}

/**
 * EditorButton
 * 에디터 내에서 공통적으로 사용되는 일반 버튼 (Figma에 정의된 Editor Button)
 */
export const EditorButton = forwardRef<HTMLButtonElement, EditorButtonProps>(
  ({ className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn('h-8 px-3 py-2 text-sm font-medium transition-colors', className)}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  },
);
EditorButton.displayName = 'EditorButton';
