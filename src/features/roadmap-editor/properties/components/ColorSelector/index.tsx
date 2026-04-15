'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Palette } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { isColorPickerOpenAtom, colorPickerTargetAtom } from '../../../stores/editor-atoms';
import { ColorPresetButton } from '../ColorPresetButton';

import type { NodeColorVariant, TextColorVariant } from '../../../types/editor.types';

interface ColorSelectorProps {
  type: 'node' | 'text';
  nodeId: string;
  currentVariant: NodeColorVariant | TextColorVariant;
  presets: { variant: NodeColorVariant | TextColorVariant; hex: string; label: string }[];
  onPresetSelect: (variant: NodeColorVariant | TextColorVariant) => void;
}

/**
 * ColorSelector molecule - Figma 디자인 100% 정합성
 *
 * Figma EditorNodeSidebar (4472:1569) 기본 컬러 섹션 구현
 * - 6개 ColorPresetButton (atoms)
 * - Palette 아이콘 + 현재 색상 프리뷰 버튼
 * - 36px 높이, 8px border-radius (Figma 스펙)
 * - Jotai atoms 사용 (isColorPickerOpenAtom, colorPickerTargetAtom)
 */
export const ColorSelector = memo(function ColorSelector({
  type,
  nodeId,
  currentVariant,
  presets,
  onPresetSelect,
}: ColorSelectorProps) {
  const setIsColorPickerOpen = useSetAtom(isColorPickerOpenAtom);
  const setColorPickerTarget = useSetAtom(colorPickerTargetAtom);

  const handleCustomColorClick = () => {
    setColorPickerTarget({ type, nodeId });
    setIsColorPickerOpen(true);
  };

  // 현재 선택된 색상의 hex 값
  const currentColorHex = presets.find((p) => p.variant === currentVariant)?.hex ?? '#ffffff';

  return (
    <div className="space-y-4">
      {/* 기본 컬러 (Preset) */}
      <div>
        <label className="text-sm font-medium text-slate-950">
          {EDITOR_MESSAGES.SIDEBAR_COLOR_PRESET_LABEL}
        </label>
        <div className="mt-1.5 flex gap-1">
          {presets.map((preset) => (
            <ColorPresetButton
              key={preset.variant}
              color={preset.hex}
              isSelected={currentVariant === preset.variant}
              onClick={() => onPresetSelect(preset.variant)}
            />
          ))}
        </div>
      </div>

      {/* 커스텀 색상 */}
      <div>
        <label className="text-sm font-medium text-slate-950">
          {EDITOR_MESSAGES.SIDEBAR_COLOR_CUSTOM_LABEL}
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          {/* Palette 아이콘 버튼 */}
          <button
            type="button"
            onClick={handleCustomColorClick}
            className="shrink-0 text-slate-600 transition-colors hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="커스텀 색상 선택기 열기"
          >
            <Palette className="size-6" />
          </button>

          {/* 현재 색상 프리뷰 버튼 (32px 높이, 8px border-radius) */}
          <button
            type="button"
            onClick={handleCustomColorClick}
            className="h-8 min-h-[32px] w-full flex-1 rounded-[8px] border border-slate-200 shadow-sm transition-all hover:scale-105 hover:shadow-md focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
            style={{ backgroundColor: currentColorHex }}
            aria-label={`현재 색상: ${currentColorHex}`}
          />
        </div>
      </div>
    </div>
  );
});
