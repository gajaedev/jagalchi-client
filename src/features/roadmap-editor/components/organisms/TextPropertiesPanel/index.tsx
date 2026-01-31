'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Lock, Unlock } from 'lucide-react';

import { TEXT_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import { EditorInput } from '../../atoms/EditorInput';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { JagalchiTextType, TextColorVariant } from '../../../types/editor.types';

interface TextPropertiesPanelProps {
  node: JagalchiTextType;
}

/**
 * Text 선택 시 표시되는 속성 패널
 *
 * Figma 디자인 기반 구조:
 * - Header: "Text_1" + Lock 버튼
 * - 텍스트 내용: EditorInput (multiline)
 * - 기본 컬러: ColorSelector
 */
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

  const toggleLock = () => {
    updateNode({ isLocked: !node.data.isLocked });
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-slate-900">{node.id}</h3>
          <p className="text-xs text-slate-600">텍스트</p>
        </div>
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
      <div className="flex-1 space-y-0 overflow-y-auto p-4">
        {/* 텍스트 내용 */}
        <div className="border-b border-slate-200 pb-4">
          <EditorInput
            label="텍스트 내용"
            value={node.data.content}
            onChange={(value) => updateNode({ content: value })}
            placeholder="텍스트를 입력하세요"
            isMultiline
            isDisabled={node.data.isLocked}
          />
        </div>

        {/* 텍스트 크기 */}
        <div className="border-b border-slate-200 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">텍스트 크기</label>
            <div className="flex items-center gap-2">
              <EditorInput value="" onChange={() => {}} placeholder="Value" isDisabled />
              <p className="text-sm text-black">px</p>
            </div>
          </div>
        </div>

        {/* 기본 컬러 */}
        <div className="border-b border-slate-200 py-4">
          <ColorSelector
            type="text"
            nodeId={node.id}
            currentVariant={node.data.variant}
            presets={TEXT_PRESET_COLORS}
            onPresetSelect={(variant) => updateNode({ variant: variant as TextColorVariant })}
          />
        </div>
      </div>
    </div>
  );
});
