'use client';

import { memo, useState } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { getRoadmapGenerated } from '@/api/ai';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { nodesAtom, edgesAtom } from '../../../stores/editor-atoms';
import { createId } from '../../../utils/node-factory';
import { RoadmapGenerationForm } from '../RoadmapGenerationForm';
import { RoadmapModificationForm } from '../RoadmapModificationForm';

import type { RoadmapNode } from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

type ModalMode = 'generate' | 'modify';

interface RoadmapAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
}

export const RoadmapAiModal = memo(function RoadmapAiModal({
  isOpen,
  onClose,
  mode,
}: RoadmapAiModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentNodes = useAtomValue(nodesAtom);
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await getRoadmapGenerated({ goal: prompt, max_nodes: 6 });

      const newNodes: RoadmapNode[] = response.nodes.map((n, index) => ({
        id: n.node_id,
        type: 'jagalchi-node' as const,
        position: { x: 200 + (index % 3) * 220, y: 100 + Math.floor(index / 3) * 160 },
        data: {
          label: n.title,
          description: '',
          resources: [],
          variant: 'white' as const,
          isLocked: false,
        },
      }));

      const newEdges: Edge[] = response.edges.map((e) => ({
        id: createId(),
        source: e.source,
        target: e.target,
      }));

      setNodes((prev) => [...prev, ...newNodes]);
      setEdges((prev) => [...prev, ...newEdges]);
      onClose();
    } catch {
      setErrorMessage(EDITOR_MESSAGES.AI_GENERATE_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = async (prompt: string) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const nodeContext = currentNodes
        .filter((n) => n.type === 'jagalchi-node')
        .map((n) => {
          const data = n.data as { label?: string };
          return data.label ?? '';
        })
        .filter(Boolean)
        .join(', ');

      const goal = nodeContext ? `현재 노드: ${nodeContext}. 수정 요청: ${prompt}` : prompt;

      const response = await getRoadmapGenerated({ goal, max_nodes: 6 });

      const newNodes: RoadmapNode[] = response.nodes.map((n, index) => ({
        id: n.node_id,
        type: 'jagalchi-node' as const,
        position: { x: 200 + (index % 3) * 220, y: 100 + Math.floor(index / 3) * 160 },
        data: {
          label: n.title,
          description: '',
          resources: [],
          variant: 'white' as const,
          isLocked: false,
        },
      }));

      const newEdges: Edge[] = response.edges.map((e) => ({
        id: createId(),
        source: e.source,
        target: e.target,
      }));

      setNodes(newNodes);
      setEdges(newEdges);
      onClose();
    } catch {
      setErrorMessage(EDITOR_MESSAGES.AI_MODIFY_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const title =
    mode === 'generate'
      ? EDITOR_MESSAGES.AI_MODAL_GENERATE_TITLE
      : EDITOR_MESSAGES.AI_MODAL_MODIFY_TITLE;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <p className="text-destructive text-sm" role="alert">
            {errorMessage}
          </p>
        )}

        {mode === 'generate' ? (
          <RoadmapGenerationForm
            onGenerate={handleGenerate}
            onCancel={onClose}
            isLoading={isLoading}
          />
        ) : (
          <RoadmapModificationForm
            onModify={handleModify}
            onCancel={onClose}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});
