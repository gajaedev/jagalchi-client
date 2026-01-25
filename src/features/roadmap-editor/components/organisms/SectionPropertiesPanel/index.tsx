'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Lock, Unlock } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import { EditorInput } from '../../atoms/EditorInput';
import { ColorSelector } from '../../molecules/ColorSelector';

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
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiSectionType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id ? ({ ...n, data: { ...n.data, ...updates } } as JagalchiSectionType) : n,
      ),
    );
  };

  const toggleLock = () => {
    updateNode({ isLocked: !node.data.isLocked });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{node.id}</h3>
        <button
          type="button"
          onClick={toggleLock}
          className="rounded-md p-1 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
          aria-label={node.data.isLocked ? '잠금 해제' : '잠금'}
        >
          {node.data.isLocked ? (
            <Lock className="h-4 w-4 text-slate-700" />
          ) : (
            <Unlock className="h-4 w-4 text-slate-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 섹션 이름 */}
        <EditorInput
          label={EDITOR_MESSAGES.SIDEBAR_SECTION_NAME_LABEL}
          value={node.data.title}
          onChange={(value) => updateNode({ title: value })}
          placeholder="섹션 이름을 입력하세요"
          isDisabled={node.data.isLocked}
        />

        {/* 기본 컬러 */}
        <ColorSelector
          type="node"
          nodeId={node.id}
          currentVariant={node.data.variant}
          presets={NODE_PRESET_COLORS}
          onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
        />
      </div>
    </div>
  );
});
