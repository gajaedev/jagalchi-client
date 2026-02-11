'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Lock, Unlock } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import { validateUrl } from '../../../utils/url-validation';
import { EditorInput } from '../../atoms/EditorInput';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { JagalchiNodeType, NodeColorVariant } from '../../../types/editor.types';

interface NodePropertiesPanelProps {
  node: JagalchiNodeType;
}

/**
 * Node 선택 시 표시되는 속성 패널
 *
 * Figma 디자인 기반 구조:
 * - Header: "Node_1" + Lock 버튼
 * - 노드 이름: EditorInput
 * - 노드 설명: EditorInput (multiline)
 * - AI 생성: LoadingButton
 * - 기본 컬러: ColorSelector
 * - 형부자료: EditorInput 3개 + "AI 추천" LoadingButton
 */
export const NodePropertiesPanel = memo(function NodePropertiesPanel({
  node,
}: NodePropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiNodeType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id ? ({ ...n, data: { ...n.data, ...updates } } as JagalchiNodeType) : n,
      ),
    );
  };

  const toggleLock = () => {
    updateNode({ isLocked: !node.data.isLocked });
  };

  const handleResourceChange = (index: number, value: string) => {
    // Validate URL to prevent XSS and invalid URLs
    const validatedUrl = validateUrl(value);

    // Only update if validation passes (null means invalid)
    if (validatedUrl !== null) {
      const newResources = [...node.data.resources];
      newResources[index] = validatedUrl;
      updateNode({ resources: newResources });
    }
  };

  // Ensure we have exactly 3 resource slots
  const resources = [...node.data.resources];
  while (resources.length < 3) {
    resources.push('');
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-slate-900">{node.id}</h3>
          <p className="text-xs text-slate-600">노드</p>
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
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 노드 이름 */}
        <EditorInput
          label={EDITOR_MESSAGES.SIDEBAR_NODE_NAME_LABEL}
          value={node.data.label}
          onChange={(value) => updateNode({ label: value })}
          placeholder="노드 이름을 입력하세요"
          isDisabled={node.data.isLocked}
        />

        {/* 노드 설명 */}
        <EditorInput
          label={EDITOR_MESSAGES.SIDEBAR_NODE_DESC_LABEL}
          value={node.data.description}
          onChange={(value) => updateNode({ description: value })}
          placeholder="노드 설명을 입력하세요"
          isMultiline
          isDisabled={node.data.isLocked}
        />
        <p className="text-muted-foreground text-right text-sm font-medium">AI 생성</p>

        {/* 기본 컬러 */}
        <ColorSelector
          type="node"
          nodeId={node.id}
          currentVariant={node.data.variant}
          presets={NODE_PRESET_COLORS}
          onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
        />

        {/* 형부자료 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">
            {EDITOR_MESSAGES.SIDEBAR_RESOURCES_LABEL}
          </label>
          <div className="space-y-2">
            {resources.slice(0, 3).map((resource: string, index: number) => (
              <EditorInput
                key={index}
                value={resource}
                onChange={(value) => handleResourceChange(index, value)}
                placeholder="URL을 입력하세요"
                isDisabled={node.data.isLocked}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-right text-sm font-medium">AI 추천</p>
        </div>
      </div>
    </div>
  );
});
