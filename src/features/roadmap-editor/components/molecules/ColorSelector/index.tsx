'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Palette } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { isColorPickerOpenAtom, colorPickerTargetAtom } from '../../../stores/editor-atoms';
import { ColorPicker } from '../../atoms/ColorPicker';
import { ColorPresetButton } from '../../atoms/ColorPresetButton';

import type { NodeColorVariant, TextColorVariant } from '../../../types/editor.types';

interface ColorSelectorProps {
  type: 'node' | 'text';
  nodeId: string;
  currentVariant: NodeColorVariant | TextColorVariant;
  presets: { variant: NodeColorVariant | TextColorVariant; hex: string; label: string }[];
  onPresetSelect: (variant: NodeColorVariant | TextColorVariant) => void;
}

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

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">{EDITOR_MESSAGES.SIDEBAR_COLOR_PRESET_LABEL}</label>
        <div className="mt-2 flex gap-2">
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

      <div>
        <label className="text-sm font-medium">{EDITOR_MESSAGES.SIDEBAR_COLOR_CUSTOM_LABEL}</label>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCustomColorClick}
            className="shrink-0 transition-colors hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="커스텀 색상 선택기 열기"
          >
            <Palette className="size-6" />
          </button>
          <ColorPicker
            value={presets.find((p) => p.variant === currentVariant)?.hex ?? '#ffffff'}
            onChange={() => {
              // 실제 커스텀 컬러는 모달에서 처리
              handleCustomColorClick();
            }}
          />
        </div>
      </div>
    </div>
  );
});
