'use client';

import { memo, useCallback, useState } from 'react';

import { getNodeDescription } from '@/api/ai';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { LoadingButton } from '../../../components/atoms/LoadingButton';
import { ResourceRecommendationModal } from '../../../components/organisms/ResourceRecommendationModal';
import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { useUpdateNode } from '../../../hooks/use-update-node';
import { validateUrl } from '../../../utils/url-validation';
import { ColorSelector } from '../ColorSelector';
import { EditorInput } from '../EditorInput';
import { PanelHeader } from '../PanelHeader';

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
  const { updateNode } = useUpdateNode(node.id);
  const [isDescLoading, setIsDescLoading] = useState(false);
  const [descError, setDescError] = useState('');
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  const toggleLock = useCallback(() => {
    updateNode({ isLocked: !node.data.isLocked });
  }, [updateNode, node.data.isLocked]);

  const handleResourceChange = useCallback(
    (index: number, value: string) => {
      const newResources = [...node.data.resources];
      newResources[index] = value;
      updateNode({ resources: newResources });
    },
    [node.data.resources, updateNode],
  );

  const handleResourceBlur = useCallback(
    (index: number) => {
      const raw = node.data.resources[index];
      if (!raw) return;
      const validated = validateUrl(raw);
      const newResources = [...node.data.resources];
      newResources[index] = validated ?? '';
      updateNode({ resources: newResources });
    },
    [node.data.resources, updateNode],
  );

  const handleGenerateDescription = useCallback(async () => {
    if (!node.data.label) return;
    setIsDescLoading(true);
    setDescError('');
    try {
      const response = await getNodeDescription({ node_title: node.data.label });
      updateNode({ description: response.description });
    } catch {
      setDescError(EDITOR_MESSAGES.AI_DESC_ERROR);
    } finally {
      setIsDescLoading(false);
    }
  }, [node.data.label, updateNode]);

  const handleAddResource = useCallback(
    (url: string) => {
      const emptyIndex = node.data.resources.findIndex((r) => !r);
      if (emptyIndex !== -1) {
        handleResourceChange(emptyIndex, url);
      }
    },
    [node.data.resources, handleResourceChange],
  );

  // Ensure we have exactly 3 resource slots
  const resources = [...node.data.resources];
  while (resources.length < 3) {
    resources.push('');
  }

  return (
    <div className="flex h-full w-full flex-col">
      <PanelHeader
        title={node.data.label}
        subtitle={EDITOR_MESSAGES.NODE_SUBTITLE}
        isLocked={node.data.isLocked}
        onToggleLock={toggleLock}
      />

      {/* Content */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 노드 이름 */}
        <EditorInput
          label={EDITOR_MESSAGES.SIDEBAR_NODE_NAME_LABEL}
          value={node.data.label}
          onChange={(value) => updateNode({ label: value })}
          placeholder={EDITOR_MESSAGES.NODE_NAME_PLACEHOLDER}
          isDisabled={node.data.isLocked}
        />

        {/* 노드 설명 */}
        <EditorInput
          label={EDITOR_MESSAGES.SIDEBAR_NODE_DESC_LABEL}
          value={node.data.description}
          onChange={(value) => updateNode({ description: value })}
          placeholder={EDITOR_MESSAGES.NODE_DESC_PLACEHOLDER}
          isMultiline
          isDisabled={node.data.isLocked || isDescLoading}
        />
        {descError && <p className="text-destructive text-xs">{descError}</p>}
        <div className="flex justify-end">
          <LoadingButton
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-auto p-0 text-sm font-medium hover:bg-transparent hover:underline"
            isLoading={isDescLoading}
            onClick={handleGenerateDescription}
            disabled={node.data.isLocked || !node.data.label}
          >
            {isDescLoading ? EDITOR_MESSAGES.AI_DESC_LOADING : EDITOR_MESSAGES.AI_DESC_BUTTON}
          </LoadingButton>
        </div>

        {/* 기본 컬러 */}
        <ColorSelector
          type="node"
          nodeId={node.id}
          currentVariant={node.data.variant}
          presets={NODE_PRESET_COLORS}
          onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
        />

        {/* 형부자료 */}
        <div className="space-y-1.5">
          <span className="text-sm font-medium text-slate-950">
            {EDITOR_MESSAGES.SIDEBAR_RESOURCES_LABEL}
          </span>
          <div className="space-y-2">
            {resources.slice(0, 3).map((resource: string, index: number) => (
              <EditorInput
                key={index}
                value={resource}
                onChange={(value) => handleResourceChange(index, value)}
                onBlur={() => handleResourceBlur(index)}
                placeholder={EDITOR_MESSAGES.RESOURCE_URL_PLACEHOLDER}
                isDisabled={node.data.isLocked}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-muted-foreground text-sm font-medium hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setIsResourceModalOpen(true)}
              disabled={node.data.isLocked}
            >
              {EDITOR_MESSAGES.AI_RECOMMEND_BUTTON}
            </button>
          </div>
        </div>
      </div>

      <ResourceRecommendationModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        nodeName={node.data.label}
        onAddResource={handleAddResource}
      />
    </div>
  );
});
