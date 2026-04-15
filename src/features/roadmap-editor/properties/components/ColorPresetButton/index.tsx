import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface ColorPresetButtonProps {
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * 컬러 프리셋 버튼 컴포넌트
 *
 * Figma EditorNodeSidebar (4472:1569)의 기본 컬러 섹션에서 추출.
 * 6개 프리셋 컬러: white, black, blue(#155dfc), purple(#9810fa), red(#ec003f), orange(#e17100)
 *
 * @example
 * ```tsx
 * <ColorPresetButton
 *   color="#155dfc"
 *   isSelected={selectedColor === '#155dfc'}
 *   onClick={() => setSelectedColor('#155dfc')}
 * />
 * ```
 */
export const ColorPresetButton = forwardRef<HTMLButtonElement, ColorPresetButtonProps>(
  ({ color, isSelected = false, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          // 32px 높이, 너비는 flex-1로 균등 분할
          'h-8 min-h-[32px] min-w-[32px] flex-1',
          'rounded-[8px]',
          // Border: 모든 색상 동일한 1px 테두리
          'border border-slate-200',
          'shadow-sm',
          // 인터랙션
          'transition-all duration-200',
          'hover:scale-105 hover:shadow-md',
          'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none',
          'active:scale-95',
          // 선택 상태
          isSelected && 'scale-105 ring-2 ring-slate-900 ring-offset-2',
          // Disabled 상태
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100',
          className,
        )}
        style={{ backgroundColor: color }}
        aria-pressed={isSelected}
        aria-label={`색상: ${color}`}
      />
    );
  },
);

ColorPresetButton.displayName = 'ColorPresetButton';
