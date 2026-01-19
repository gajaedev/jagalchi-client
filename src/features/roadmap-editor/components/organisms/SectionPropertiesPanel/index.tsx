'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { JagalchiSectionType, NodeColorVariant } from '../../../types/editor.types';

interface SectionPropertiesPanelProps {
  node: JagalchiSectionType;
}

export const SectionPropertiesPanel = memo(function SectionPropertiesPanel({
  node,
}: SectionPropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiSectionType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id ? ({ ...n, data: { ...n.data, ...updates } } as JagalchiSectionType) : n,
      ),
    );
  };

  const updateSize = (dimension: 'width' | 'height', value: number) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id
          ? ({
              ...n,
              style: {
                ...n.style,
                [dimension]: value,
              },
            } as JagalchiSectionType)
          : n,
      ),
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="section-title">{EDITOR_MESSAGES.SIDEBAR_SECTION_NAME_LABEL}</Label>
        <Input
          id="section-title"
          value={node.data.title}
          onChange={(e) => updateNode({ title: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label>{EDITOR_MESSAGES.SIDEBAR_SECTION_SIZE_LABEL}</Label>
        <div className="mt-1 flex gap-2">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm">W</span>
            <Input
              type="number"
              value={node.style?.width ?? 200}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!Number.isNaN(value) && value >= 200) {
                  updateSize('width', value);
                }
              }}
              className="w-20"
              min={200}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm">H</span>
            <Input
              type="number"
              value={node.style?.height ?? 200}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (!Number.isNaN(value) && value >= 200) {
                  updateSize('height', value);
                }
              }}
              className="w-20"
              min={200}
            />
          </div>
        </div>
      </div>

      <ColorSelector
        type="node"
        nodeId={node.id}
        currentVariant={node.data.variant}
        presets={NODE_PRESET_COLORS}
        onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
      />
    </div>
  );
});
