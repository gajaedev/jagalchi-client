'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { TEXT_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { JagalchiTextType, TextColorVariant } from '../../../types/editor.types';

interface TextPropertiesPanelProps {
  node: JagalchiTextType;
}

export const TextPropertiesPanel = memo(function TextPropertiesPanel({
  node,
}: TextPropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiTextType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id ? ({ ...n, data: { ...n.data, ...updates } } as JagalchiTextType) : n,
      ),
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="text-size">{EDITOR_MESSAGES.SIDEBAR_TEXT_SIZE_LABEL}</Label>
        <div className="mt-1 flex items-center gap-2">
          <Input
            id="text-size"
            type="number"
            value={node.data.fontSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!Number.isNaN(value) && value >= 8 && value <= 72) {
                updateNode({ fontSize: value });
              }
            }}
            className="w-20"
            min={8}
            max={72}
          />
          <span className="text-muted-foreground text-sm">px</span>
        </div>
      </div>

      <ColorSelector
        type="text"
        nodeId={node.id}
        currentVariant={node.data.variant}
        presets={TEXT_PRESET_COLORS}
        onPresetSelect={(variant) => updateNode({ variant: variant as TextColorVariant })}
      />
    </div>
  );
});
