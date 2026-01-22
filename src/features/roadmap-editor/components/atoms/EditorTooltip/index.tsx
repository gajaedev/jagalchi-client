'use client';

import { cloneElement, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface EditorTooltipProps {
  /**
   * Tooltip content
   */
  content: string;

  /**
   * Trigger element
   */
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & {
      onMouseEnter?: () => void;
      onMouseLeave?: () => void;
      onFocus?: () => void;
      onBlur?: () => void;
      'aria-describedby'?: string;
    }
  >;

  /**
   * Delay before showing tooltip (ms)
   * @default 500
   */
  delay?: number;

  /**
   * Additional CSS classes for tooltip
   */
  className?: string;

  /**
   * Tooltip placement
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * EditorTooltip - Accessible tooltip component for roadmap editor
 *
 * Figma specs:
 * - Background: neutral-900
 * - Text: white, 12px
 * - Padding: 6px 10px
 * - Border radius: 6px
 * - Delay: 500ms
 * - Max width: 200px
 */
export function EditorTooltip({
  content,
  children,
  delay = 500,
  className,
  side = 'top',
}: EditorTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-neutral-900',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-neutral-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-neutral-900',
    right:
      'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-neutral-900',
  };

  return (
    <div className="relative inline-block">
      {/* eslint-disable-next-line react-hooks/refs */}
      {cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        'aria-describedby': isVisible ? tooltipId : undefined,
      })}

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-50 max-w-[200px] rounded-[var(--radius-tooltip)] bg-neutral-900 px-[var(--spacing-tooltip-x)] py-[var(--spacing-tooltip-y)] text-xs text-white',
            positionClasses[side],
            className,
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn('absolute h-0 w-0 border-[4px]', arrowClasses[side])}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
