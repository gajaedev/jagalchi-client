'use client';

import { memo, useCallback } from 'react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { useUpdateNode } from '../../../hooks/use-update-node';
import { ColorSelector } from '../ColorSelector';
import { EditorInput } from '../EditorInput';
import { PanelHeader } from '../PanelHeader';

import type { JagalchiSectionType, NodeColorVariant } from '../../../types/editor.types';

interface SectionPropertiesPanelProps {
  node: JagalchiSectionType;
}

/**
 * Section 선택 시 표시되는 속성 패널
 *
 * Figma 디자인 기반 구조:
 * - Header: "Section_1" + Lock 버튼
 * - 섹션 이름: EditorInput
 * - 기본 컬러: ColorSelector
 */
export const SectionPropertiesPanel = memo(function SectionPropertiesPanel({
  node,
}: SectionPropertiesPanelProps) {
  const { updateNode, updateNodeStyle } = useUpdateNode(node.id);

  const toggleLock = useCallback(() => {
    updateNode({ isLocked: !node.data.isLocked });
  }, [updateNode, node.data.isLocked]);

  const handleTitleChange = useCallback(
    (value: string) => {
      updateNode({ title: value });
    },
    [updateNode],
  );

  const handleColorChange = useCallback(
    (variant: NodeColorVariant | string) => {
      updateNode({ variant: variant as NodeColorVariant });
    },
    [updateNode],
  );

  const currentWidth = String(node.style?.width ?? node.measured?.width ?? 200);
  const currentHeight = String(node.style?.height ?? node.measured?.height ?? 200);

  const handleWidthChange = useCallback(
    (value: string) => {
      if (node.data.isLocked) return;
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue > 0) {
        updateNodeStyle({ width: numValue });
      }
    },
    [node.data.isLocked, updateNodeStyle],
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      if (node.data.isLocked) return;
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue > 0) {
        updateNodeStyle({ height: numValue });
      }
    },
    [node.data.isLocked, updateNodeStyle],
  );

  return (
    <div className="flex h-full w-full flex-col">
      <PanelHeader
        title={node.data.title || '섹션'}
        subtitle="섹션"
        isLocked={node.data.isLocked}
        onToggleLock={toggleLock}
      />

      {/* Content */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 섹션 이름 */}
        <EditorInput
          label={EDITOR_MESSAGES.SIDEBAR_SECTION_NAME_LABEL}
          value={node.data.title}
          onChange={handleTitleChange}
          placeholder="섹션 이름을 입력하세요"
          isDisabled={node.data.isLocked}
        />
      </div>

      {/* 크기 */}
      <div className="border-b border-slate-200 p-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-950">
            {EDITOR_MESSAGES.SIDEBAR_SECTION_SIZE_LABEL}
          </label>
          <div className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-2">
              <p className="text-sm text-black">W</p>
              <EditorInput
                value={currentWidth}
                onChange={handleWidthChange}
                placeholder="200"
                isDisabled={node.data.isLocked}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <p className="text-sm text-black">H</p>
              <EditorInput
                value={currentHeight}
                onChange={handleHeightChange}
                placeholder="200"
                isDisabled={node.data.isLocked}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-0 overflow-y-auto p-4">
        {/* 기본 컬러 */}
        <ColorSelector
          type="node"
          nodeId={node.id}
          currentVariant={node.data.variant}
          presets={NODE_PRESET_COLORS}
          onPresetSelect={handleColorChange}
        />
      </div>
    </div>
  );
});
