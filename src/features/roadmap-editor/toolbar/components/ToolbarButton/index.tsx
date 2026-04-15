'use client';

import { forwardRef, memo, type ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface ToolbarButtonProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  testId?: string;
}

/**
 * 툴바 버튼 컴포넌트
 *
 * Figma EditorHeader (4472:2494)의 툴바 버튼 디자인
 * - 크기: 32px x 32px
 * - Active: 파란색 배경, 흰색 아이콘
 * - Inactive: 투명 배경, 회색 아이콘
 */
export const ToolbarButton = memo(
  forwardRef<HTMLButtonElement, ToolbarButtonProps>(
    ({ icon, label, isActive, onClick, className, testId }, ref) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                ref={ref}
                type="button"
                onClick={onClick}
                aria-label={label}
                aria-pressed={isActive}
                data-testid={testId}
                className={cn(
                  // 크기 및 레이아웃 (Figma: 32px x 32px, 8px radius)
                  'inline-flex h-8 w-8 items-center justify-center p-[7px]',
                  'rounded-lg',
                  // 기본 스타일
                  'transition-colors',
                  // Active 상태
                  isActive
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-transparent text-slate-600 hover:bg-slate-100',
                  // Focus
                  'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none',
                  className,
                )}
              >
                {icon}
              </button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  ),
);

ToolbarButton.displayName = 'ToolbarButton';
