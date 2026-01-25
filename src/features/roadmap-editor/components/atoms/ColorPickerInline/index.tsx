import { forwardRef } from 'react';

import { HexColorPicker } from 'react-colorful';

import { cn } from '@/lib/utils';

export interface ColorPickerInlineProps {
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
}

/**
 * 인라인 2D 그라디언트 컬러 피커 컴포넌트
 *
 * Figma EditorNodeSidebar (4472:1569)의 커스텀 컬러 섹션에서 추출.
 * react-colorful을 사용한 2D 그라디언트 컬러 피커.
 * molecules/ColorPicker (Dialog 기반)과 구분하기 위해 Inline 접미사 사용.
 *
 * @example
 * ```tsx
 * <ColorPickerInline
 *   value="#009689"
 *   onChange={(color) => setCustomColor(color)}
 * />
 * ```
 */
export const ColorPickerInline = forwardRef<HTMLDivElement, ColorPickerInlineProps>(
  ({ value = '#009689', onChange, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-1',
          // react-colorful 스타일 오버라이드
          '[&_.react-colorful]:h-auto [&_.react-colorful]:w-full',
          // Figma 스타일 (36px 높이, 8px border-radius)
          '[&_.react-colorful]:rounded-[8px]',
          '[&_.react-colorful]:border [&_.react-colorful]:border-slate-200',
          '[&_.react-colorful]:shadow-sm',
          // Saturation 영역
          '[&_.react-colorful__saturation]:h-[100px] [&_.react-colorful__saturation]:rounded-t-[8px]',
          // Hue 슬라이더
          '[&_.react-colorful__hue]:h-[36px] [&_.react-colorful__hue]:rounded-b-[8px]',
          '[&_.react-colorful__hue]:border-t [&_.react-colorful__hue]:border-slate-200',
          // Pointer 스타일
          '[&_.react-colorful__pointer]:size-[16px]',
          '[&_.react-colorful__pointer]:border-2 [&_.react-colorful__pointer]:border-white',
          '[&_.react-colorful__pointer]:shadow-md',
          className,
        )}
        role="group"
        aria-label="색상 선택"
      >
        <HexColorPicker color={value} onChange={onChange} />
      </div>
    );
  },
);

ColorPickerInline.displayName = 'ColorPickerInline';
