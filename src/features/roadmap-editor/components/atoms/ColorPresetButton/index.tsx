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
    // white/black 색상은 더 진한 border 사용
    const isLightColor = color.toLowerCase() === 'white' || color.toLowerCase() === '#ffffff';
    const isDarkColor = color.toLowerCase() === 'black' || color.toLowerCase() === '#000000';

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          // Figma 정확한 스타일 (36px x 36px 정사각형, 8px border-radius)
          'h-[36px] min-h-[36px] w-[36px] min-w-[36px]',
          'rounded-[8px]',
          // Border: white/black은 더 진하게
          isLightColor
            ? 'border-2 border-slate-300'
            : isDarkColor
              ? 'border-2 border-slate-700'
              : 'border border-slate-200',
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
