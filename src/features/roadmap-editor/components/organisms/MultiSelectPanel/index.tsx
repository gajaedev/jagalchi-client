'use client';

import { memo } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import {
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  LockKeyhole,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom, selectedNodeIdsAtom } from '../../../stores/editor-atoms';
import { alignNodes } from '../../../utils/align-nodes';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { NodeColorVariant } from '../../../types/editor.types';
import type { AlignDirection } from '../../../utils/align-nodes';

export const MultiSelectPanel = memo(function MultiSelectPanel() {
  const setNodes = useSetAtom(nodesAtom);
  const selectedIds = useAtomValue(selectedNodeIdsAtom);
  const selectedCount = selectedIds.length;

  const handleAlign = (direction: AlignDirection) => {
    setNodes((prev) => alignNodes(prev, selectedIds, direction));
  };

  const handleBulkColorChange = (variant: NodeColorVariant) => {
    setNodes((prev) =>
      prev.map((node) => {
        if (!selectedIds.includes(node.id)) return node;
        // Only update nodes and sections (not text)
        if (node.type === 'jagalchi-node') {
          return { ...node, data: { ...node.data, variant } } as typeof node;
        }
        if (node.type === 'jagalchi-section') {
          return { ...node, data: { ...node.data, variant } } as typeof node;
        }
        return node;
      }),
    );
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{EDITOR_MESSAGES.MULTI_SELECT_TITLE}</h3>
          <span className="text-muted-foreground text-sm">
            {selectedCount}
            {EDITOR_MESSAGES.MULTI_SELECT_COUNT}
          </span>
        </div>
        <Button variant="ghost" size="icon" disabled>
          <LockKeyhole className="h-4 w-4" />
        </Button>
      </div>

      {/* Alignment Section */}
      <div>
        <Label className="mb-2 block">{EDITOR_MESSAGES.MULTI_SELECT_ALIGN_LABEL}</Label>
        <div className="flex flex-col gap-2">
          {/* Horizontal alignment */}
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('left')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_LEFT}
              className="flex-1"
            >
              <AlignStartVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('center')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_CENTER}
              className="flex-1"
            >
              <AlignCenterVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('right')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_RIGHT}
              className="flex-1"
            >
              <AlignEndVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* Vertical alignment */}
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('top')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_TOP}
              className="flex-1"
            >
              <AlignStartHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('middle')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_MIDDLE}
              className="flex-1"
            >
              <AlignCenterHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('bottom')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_BOTTOM}
              className="flex-1"
            >
              <AlignEndHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Spacing Section (Phase 4) */}
      <div>
        <Label className="mb-2 block">{EDITOR_MESSAGES.MULTI_SELECT_SPACING_LABEL}</Label>
        <div className="flex gap-2">
          <Input placeholder="X" disabled />
          <Input placeholder="Y" disabled />
        </div>
      </div>

      {/* Mixed inputs for name/description */}
      <div>
        <Label>{EDITOR_MESSAGES.SIDEBAR_NODE_NAME_LABEL}</Label>
        <Input value={EDITOR_MESSAGES.MULTI_SELECT_NAME_MIXED} disabled className="mt-1" />
      </div>

      <div>
        <Label>{EDITOR_MESSAGES.SIDEBAR_NODE_DESC_LABEL}</Label>
        <Textarea
          value={EDITOR_MESSAGES.MULTI_SELECT_DESC_MIXED}
          disabled
          className="mt-1"
          rows={3}
        />
      </div>

      {/* Color selector for bulk editing */}
      <ColorSelector
        type="node"
        nodeId={selectedIds[0] ?? ''}
        currentVariant="white"
        presets={NODE_PRESET_COLORS}
        onPresetSelect={(variant) => handleBulkColorChange(variant as NodeColorVariant)}
      />
    </div>
  );
});
