import { forwardRef, useRef } from 'react';

import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
}

/**
 * 커스텀 컬러 선택 컴포넌트
 *
 * Figma EditorNodeSidebar (4472:1569)의 커스텀 컬러 섹션에서 추출.
 * HTML input[type="color"]를 감싼 커스텀 컬러 박스.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value="#009689"
 *   onChange={(color) => setCustomColor(color)}
 * />
 * ```
 */
export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ value = '#009689', onChange, className }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div className="relative flex-1">
        <input
          ref={ref || inputRef}
          type="color"
          value={value}
          onChange={handleChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="커스텀 색상 선택"
        />
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            // Figma 정확한 스타일 (높이 36px, 8px border-radius)
            'h-[36px] min-h-[36px] w-full flex-1',
            'rounded-[8px]',
            'border border-slate-200',
            'shadow-sm',
            // 인터랙션
            'transition-all duration-200',
            'hover:scale-105 hover:shadow-md',
            'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none',
            'active:scale-95',
            className,
          )}
          style={{ backgroundColor: value }}
          aria-label={`현재 색상: ${value}`}
        />
      </div>
    );
  },
);

ColorPicker.displayName = 'ColorPicker';
