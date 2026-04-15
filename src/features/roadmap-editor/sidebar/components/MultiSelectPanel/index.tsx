'use client';

import { memo, useCallback } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import {
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignHorizontalJustifyCenter,
  LockKeyholeOpen,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { ColorSelector } from '../../../properties/components';
import { nodesAtom, selectedNodeIdsAtom } from '../../../stores/editor-atoms';
import { alignNodes } from '../../../utils/align-nodes';

import type { NodeColorVariant } from '../../../types/editor.types';
import type { AlignDirection } from '../../../utils/align-nodes';

export const MultiSelectPanel = memo(function MultiSelectPanel() {
  const setNodes = useSetAtom(nodesAtom);
  const selectedIds = useAtomValue(selectedNodeIdsAtom);

  const handleAlign = useCallback(
    (direction: AlignDirection) => {
      setNodes((prev) => alignNodes(prev, selectedIds, direction));
    },
    [setNodes, selectedIds],
  );

  const handleBulkColorChange = useCallback(
    (variant: NodeColorVariant) => {
      const selectedIdsSet = new Set(selectedIds);
      setNodes((prev) =>
        prev.map((node) => {
          if (!selectedIdsSet.has(node.id)) return node;
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
    },
    [setNodes, selectedIds],
  );

  return (
    <div className="h-full w-full space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-slate-950">
            {EDITOR_MESSAGES.MULTI_SELECT_TITLE}
          </h3>
          <p className="text-xs text-slate-950">{EDITOR_MESSAGES.MULTI_SELECT_NODE_LABEL}</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-[4px]" disabled>
          <LockKeyholeOpen className="h-[13px] w-[13px]" />
        </Button>
      </div>

      {/* Alignment Section */}
      <div className="border-b border-slate-200 pb-4">
        <Label className="mb-2 block">{EDITOR_MESSAGES.MULTI_SELECT_ALIGN_LABEL}</Label>
        <div className="flex items-start justify-between">
          {/* Horizontal alignment */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('left')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_LEFT}
              className="h-8 w-8 rounded-r-none"
            >
              <AlignStartVertical className="h-[15px] w-[15px]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('center')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_CENTER}
              className="h-8 w-8 rounded-none border-r-0 border-l-0"
            >
              <AlignCenterVertical className="h-[15px] w-[15px]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('right')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_RIGHT}
              className="h-8 w-8 rounded-l-none"
            >
              <AlignEndVertical className="h-[15px] w-[15px]" />
            </Button>
          </div>

          {/* Vertical alignment */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('top')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_TOP}
              className="h-8 w-8 rounded-r-none"
            >
              <AlignStartHorizontal className="h-[15px] w-[15px]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('middle')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_MIDDLE}
              className="h-8 w-8 rounded-none border-r-0 border-l-0"
            >
              <AlignCenterHorizontal className="h-[15px] w-[15px]" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlign('bottom')}
              title={EDITOR_MESSAGES.MULTI_SELECT_ALIGN_BOTTOM}
              className="h-8 w-8 rounded-l-none"
            >
              <AlignEndHorizontal className="h-[15px] w-[15px]" />
            </Button>
          </div>
        </div>
      </div>

      {/* Spacing Section */}
      <div className="border-b border-slate-200 pb-4">
        <Label className="mb-2 block">{EDITOR_MESSAGES.MULTI_SELECT_SPACING_LABEL}</Label>
        <div className="flex items-center gap-2">
          <AlignHorizontalJustifyCenter className="h-6 w-6 shrink-0" />
          <Input placeholder="Mixed" disabled className="flex-1" />
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
