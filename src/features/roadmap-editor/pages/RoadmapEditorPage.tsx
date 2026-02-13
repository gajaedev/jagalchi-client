'use client';

import { useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useSetAtom, useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';

import { UnsavedChangesDialog } from '../components/organisms/UnsavedChangesDialog';
import { RoadmapEditor } from '../components/templates/RoadmapEditor';
import { useAutoSave } from '../hooks/use-auto-save';
import { nodesAtom, edgesAtom, roadmapTitleAtom } from '../stores/editor-atoms';

import { ErrorFallback } from './ErrorFallback';
import { LoadingSkeleton } from './LoadingSkeleton';

import type { Roadmap, CreateRoadmapInput } from '../types/roadmap.types';

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

  // Calculate hasChanges using useMemo instead of useEffect
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

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);

    // Re-trigger load
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
  };

  const handleBack = () => {
    if (hasChanges) {
      setShowExitDialog(true);
    } else {
      router.push('/myroadmap');
    }
  };

  const handleSave = () => {
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

    // Update initial state (this will cause hasChanges to become false via useMemo)
    setInitialNodes(JSON.stringify(nodes));
    setInitialEdges(JSON.stringify(edges));
    setInitialTitle(title);
  };

  const handleSaveAndExit = () => {
    handleSave();
    router.push('/myroadmap');
  };

  const handleDiscardAndExit = () => {
    router.push('/myroadmap');
  };

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
        onClose={() => setShowExitDialog(false)}
        onSave={handleSaveAndExit}
        onDiscard={handleDiscardAndExit}
      />
    </>
  );
}

// ========== Local Storage Helpers ==========

const STORAGE_KEY = 'jagalchi-roadmaps';

function createEmptyRoadmap(id: string, input?: CreateRoadmapInput): Roadmap {
  const now = new Date().toISOString();
  return {
    id,
    title: input?.title || 'Untitled Roadmap',
    description: input?.description,
    nodes: [],
    edges: [],
    isPublic: input?.isPublic ?? false,
    createdAt: now,
    updatedAt: now,
  };
}

function loadRoadmapFromLocalStorage(id: string): Roadmap | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const roadmaps: Roadmap[] = JSON.parse(stored);
    return roadmaps.find((r) => r.id === id) || null;
  } catch {
    return null;
  }
}

function saveRoadmapToLocalStorage(roadmap: Roadmap): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let roadmaps: Roadmap[] = stored ? JSON.parse(stored) : [];

    // Update or add roadmap
    const index = roadmaps.findIndex((r) => r.id === roadmap.id);
    if (index !== -1) {
      roadmaps[index] = { ...roadmap, updatedAt: new Date().toISOString() };
    } else {
      roadmaps.push(roadmap);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmaps));
  } catch {
    // Fail silently for now - will be replaced with API error handling
  }
}
