'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Palette } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { isColorPickerOpenAtom, colorPickerTargetAtom } from '../../../stores/editor-atoms';
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
              hex={preset.hex}
              label={preset.label}
              isSelected={currentVariant === preset.variant}
              onClick={() => onPresetSelect(preset.variant)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">{EDITOR_MESSAGES.SIDEBAR_COLOR_CUSTOM_LABEL}</label>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleCustomColorClick}
          >
            <Palette className="h-4 w-4" />
          </Button>
          <div
            className="h-8 w-8 rounded border"
            style={{
              backgroundColor: presets.find((p) => p.variant === currentVariant)?.hex ?? '#ffffff',
            }}
          />
        </div>
      </div>
    </div>
  );
});
