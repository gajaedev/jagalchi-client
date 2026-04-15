import { useEffect, useState, useMemo, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue } from 'jotai';

import {
  loadRoadmapFromLocalStorage,
  saveRoadmapToLocalStorage,
} from '../services/roadmap-storage';
import { nodesAtom, edgesAtom, roadmapTitleAtom } from '../stores/editor-atoms';
import { hashNodes, hashEdges } from '../utils/fast-hash';

import type { Roadmap } from '../types/roadmap.types';

interface UseUnsavedChangesProps {
  roadmapId: string;
  initialNodes: string;
  initialEdges: string;
  initialTitle: string;
  isLoading: boolean;
}

interface UseUnsavedChangesReturn {
  hasChanges: boolean;
  showExitDialog: boolean;
  setShowExitDialog: (show: boolean) => void;
  handleBack: () => void;
  handleSave: () => void;
  handleSaveAndExit: () => void;
  handleDiscardAndExit: () => void;
}

export function useUnsavedChanges({
  roadmapId,
  initialNodes,
  initialEdges,
  initialTitle,
  isLoading,
}: UseUnsavedChangesProps): UseUnsavedChangesReturn {
  const router = useRouter();
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const title = useAtomValue(roadmapTitleAtom);

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [savedNodes, setSavedNodes] = useState<string>('');
  const [savedEdges, setSavedEdges] = useState<string>('');
  const [savedTitle, setSavedTitle] = useState<string>('');

  // Calculate hasChanges against initial state (using fast hash for performance)
  const hasChanges = useMemo(() => {
    if (isLoading || !initialNodes) return false;

    const currentNodes = hashNodes(nodes);
    const currentEdges = hashEdges(edges);
    const currentTitle = title;

    // Use saved state if available (after manual save), otherwise use initial state
    const compareNodes = savedNodes || initialNodes;
    const compareEdges = savedEdges || initialEdges;
    const compareTitle = savedTitle || initialTitle;

    return (
      currentNodes !== compareNodes ||
      currentEdges !== compareEdges ||
      currentTitle !== compareTitle
    );
  }, [
    nodes,
    edges,
    title,
    savedNodes,
    savedEdges,
    savedTitle,
    initialNodes,
    initialEdges,
    initialTitle,
    isLoading,
  ]);

  // Prevent accidental browser close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const handleBack = useCallback(() => {
    if (hasChanges) {
      setShowExitDialog(true);
    } else {
      router.push('/myroadmap');
    }
  }, [hasChanges, router]);

  const handleSave = useCallback(() => {
    const roadmap = loadRoadmapFromLocalStorage(Number(roadmapId));
    if (!roadmap) return;

    const updated: Roadmap = {
      ...roadmap,
      title,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    };

    saveRoadmapToLocalStorage(updated);

    // Update saved state (using fast hash)
    setSavedNodes(hashNodes(nodes));
    setSavedEdges(hashEdges(edges));
    setSavedTitle(title);
  }, [roadmapId, nodes, edges, title]);

  const handleSaveAndExit = useCallback(() => {
    handleSave();
    router.push('/myroadmap');
  }, [handleSave, router]);

  const handleDiscardAndExit = useCallback(() => {
    router.push('/myroadmap');
  }, [router]);

  return {
    hasChanges,
    showExitDialog,
    setShowExitDialog,
    handleBack,
    handleSave,
    handleSaveAndExit,
    handleDiscardAndExit,
  };
}
