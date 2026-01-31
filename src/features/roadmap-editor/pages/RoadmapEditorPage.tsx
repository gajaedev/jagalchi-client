'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { useSetAtom, useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';

import { UnsavedChangesDialog } from '../components/organisms/UnsavedChangesDialog';
import { RoadmapEditor } from '../components/templates/RoadmapEditor';
import { useAutoSave } from '../hooks/use-auto-save';
import { nodesAtom, edgesAtom, roadmapTitleAtom } from '../stores/editor-atoms';
import {
  createEmptyRoadmap,
  loadRoadmapFromLocalStorage,
  saveRoadmapToLocalStorage,
} from '../utils/roadmap-storage';

import { ErrorFallback } from './ErrorFallback';
import { LoadingSkeleton } from './LoadingSkeleton';

import type { Roadmap } from '../types/roadmap.types';

interface RoadmapEditorPageProps {
  roadmapId: string;
}

export function RoadmapEditorPage({ roadmapId }: RoadmapEditorPageProps) {
  const router = useRouter();
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  const setTitle = useSetAtom(roadmapTitleAtom);
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const title = useAtomValue(roadmapTitleAtom);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [initialNodes, setInitialNodes] = useState<string>('');
  const [initialEdges, setInitialEdges] = useState<string>('');
  const [initialTitle, setInitialTitle] = useState<string>('');

  const hasChanges = useMemo(() => {
    if (isLoading || !initialNodes) return false;

    const currentNodes = JSON.stringify(nodes);
    const currentEdges = JSON.stringify(edges);
    const currentTitle = title;

    return (
      currentNodes !== initialNodes ||
      currentEdges !== initialEdges ||
      currentTitle !== initialTitle
    );
  }, [nodes, edges, title, initialNodes, initialEdges, initialTitle, isLoading]);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if roadmapId is 'new' - create new roadmap
        if (roadmapId === 'new') {
          const newId = nanoid();
          const newRoadmap = createEmptyRoadmap(newId);
          saveRoadmapToLocalStorage(newRoadmap);

          // Redirect to new roadmap ID
          router.replace(`/editor/${newId}`);
          return;
        }

        // Load existing roadmap
        const roadmap = loadRoadmapFromLocalStorage(roadmapId);

        if (!roadmap) {
          setError('로드맵을 찾을 수 없습니다.');
          return;
        }

        // Initialize editor state
        setNodes(roadmap.nodes);
        setEdges(roadmap.edges);
        setTitle(roadmap.title);

        // Store initial state for change detection
        setInitialNodes(JSON.stringify(roadmap.nodes));
        setInitialEdges(JSON.stringify(roadmap.edges));
        setInitialTitle(roadmap.title);

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '로드맵을 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, [roadmapId, router, setNodes, setEdges, setTitle]);

  // Auto-save (debounced)
  useAutoSave({
    roadmapId,
    nodes,
    edges,
    title,
    isEnabled: !isLoading && !error,
  });

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

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);

    const roadmap = loadRoadmapFromLocalStorage(roadmapId);
    if (roadmap) {
      setNodes(roadmap.nodes);
      setEdges(roadmap.edges);
      setTitle(roadmap.title);
      setInitialNodes(JSON.stringify(roadmap.nodes));
      setInitialEdges(JSON.stringify(roadmap.edges));
      setInitialTitle(roadmap.title);
      setIsLoading(false);
    } else {
      setError('로드맵을 찾을 수 없습니다.');
      setIsLoading(false);
    }
  }, [roadmapId, setNodes, setEdges, setTitle]);

  const handleBack = useCallback(() => {
    if (hasChanges) {
      setShowExitDialog(true);
    } else {
      router.push('/myroadmap');
    }
  }, [hasChanges, router]);

  const handleSave = useCallback(() => {
    const roadmap = loadRoadmapFromLocalStorage(roadmapId);
    if (!roadmap) return;

    const updated: Roadmap = {
      ...roadmap,
      title,
      nodes,
      edges,
      updatedAt: new Date().toISOString(),
    };

    saveRoadmapToLocalStorage(updated);

    setInitialNodes(JSON.stringify(nodes));
    setInitialEdges(JSON.stringify(edges));
    setInitialTitle(title);
  }, [roadmapId, title, nodes, edges]);

  const handleSaveAndExit = useCallback(() => {
    handleSave();
    router.push('/myroadmap');
  }, [handleSave, router]);

  const handleDiscardAndExit = useCallback(() => {
    router.push('/myroadmap');
  }, [router]);

  const handleCloseDialog = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorFallback error={error} onRetry={handleRetry} />;
  }

  return (
    <>
      <RoadmapEditor onBack={handleBack} />

      <UnsavedChangesDialog
        isOpen={showExitDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveAndExit}
        onDiscard={handleDiscardAndExit}
      />
    </>
  );
}
