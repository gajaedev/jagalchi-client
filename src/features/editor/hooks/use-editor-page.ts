import { useEffect, useState } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import {
  toolbarModeAtom,
  flowNodesAtom,
  flowEdgesAtom,
} from '@/features/editor/stores/editor-atoms';
import { generateDummyRoadmap, generateEmptyRoadmap } from '@/features/editor/utils/dummy-data';

interface UseEditorPageParams {
  roadmapId: string;
}

export function useEditorPage({ roadmapId }: UseEditorPageParams) {
  const [toolbarMode, setToolbarMode] = useAtom(toolbarModeAtom);
  const setFlowNodes = useSetAtom(flowNodesAtom);
  const setFlowEdges = useSetAtom(flowEdgesAtom);

  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [aiAction, setAiAction] = useState<'generate' | 'modify'>('generate');
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  // Load roadmap data on mount
  useEffect(() => {
    const loadRoadmap = () => {
      try {
        const savedData = localStorage.getItem(`roadmap-${roadmapId}`);

        if (savedData) {
          const data = JSON.parse(savedData);
          setFlowNodes(data.nodes || []);
          setFlowEdges(data.edges || []);
        } else if (roadmapId === 'new') {
          // New roadmap starts with empty state
          const { nodes, edges } = generateEmptyRoadmap();
          setFlowNodes(nodes);
          setFlowEdges(edges);
        } else {
          // Non-existent ID
          setIsNotFound(true);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load roadmap:', error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, [roadmapId, setFlowNodes, setFlowEdges]);

  // Open AI Dialog
  const handleAIAction = (action: 'generate' | 'modify') => {
    setAiAction(action);
    setIsAiDialogOpen(true);
  };

  // Generate/modify roadmap with AI
  const handleGenerate = async (prompt: string, action: 'generate' | 'modify') => {
    // TODO: Replace with actual AI API call
    // Temporarily generate dummy data
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Loading simulation

    const { nodes, edges } = generateDummyRoadmap(prompt);

    if (action === 'generate') {
      // Generate: Replace existing data
      setFlowNodes(nodes);
      setFlowEdges(edges);
    } else {
      // Modify: Append to existing data
      setFlowNodes((prev) => [...prev, ...nodes]);
      setFlowEdges((prev) => [...prev, ...edges]);
    }

    // Save to localStorage
    localStorage.setItem(`roadmap-${roadmapId}`, JSON.stringify({ nodes, edges }));

    setIsAiDialogOpen(false);
  };

  return {
    toolbarMode,
    setToolbarMode,
    isAiDialogOpen,
    setIsAiDialogOpen,
    aiAction,
    isLoading,
    isNotFound,
    handleAIAction,
    handleGenerate,
  };
}
