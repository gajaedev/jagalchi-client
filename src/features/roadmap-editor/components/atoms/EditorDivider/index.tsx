import { cn } from '@/lib/utils';

interface EditorDividerProps {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
}

/**
 * EditorDivider - Separator component for roadmap editor
 *
 * Figma specs:
 * - Horizontal: 1px height, neutral-200, 12px vertical margin
 * - Vertical: 1px width, neutral-200, 12px horizontal margin
 */
export function EditorDivider({
  orientation = 'horizontal',
  className,
  'aria-label': ariaLabel,
}: EditorDividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      className={cn(
        'bg-neutral-200',
        orientation === 'horizontal'
          ? 'my-[var(--spacing-divider-vertical)] h-px w-full'
          : 'mx-[var(--spacing-divider-horizontal)] h-full w-px',
        className,
      )}
    />
  );
}
