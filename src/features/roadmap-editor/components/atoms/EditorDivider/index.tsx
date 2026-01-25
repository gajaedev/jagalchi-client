import { cn } from '@/lib/utils';

interface EditorDividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * 에디터 전용 구분선 컴포넌트
 *
 * 수평 또는 수직 구분선을 표시합니다.
 *
 * @example
 * ```tsx
 * <EditorDivider orientation="horizontal" />
 * <EditorDivider orientation="vertical" />
 * ```
 */
export const EditorDivider = ({ orientation = 'horizontal', className }: EditorDividerProps) => {
  return (
    <div
      className={cn(
        'bg-slate-200',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
};

EditorDivider.displayName = 'EditorDivider';
