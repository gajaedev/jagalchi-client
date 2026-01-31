import { useEffect, useRef } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import type { RoadmapNode } from '../types/editor.types';
import type { Roadmap } from '../types/roadmap.types';
import type { Edge } from '@xyflow/react';

interface UseAutoSaveProps {
  roadmapId: string;
  nodes: RoadmapNode[];
  edges: Edge[];
  title: string;
  isEnabled?: boolean;
}

const STORAGE_KEY = 'jagalchi-roadmaps';

export function useAutoSave({
  roadmapId,
  nodes,
  edges,
  title,
  isEnabled = true,
}: UseAutoSaveProps) {
  const prevNodesRef = useRef<string>('');
  const prevEdgesRef = useRef<string>('');
  const prevTitleRef = useRef<string>('');

  // 500ms debounce
  const debouncedNodes = useDebounce(nodes, 500);
  const debouncedEdges = useDebounce(edges, 500);
  const debouncedTitle = useDebounce(title, 500);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    const currentNodes = JSON.stringify(debouncedNodes);
    const currentEdges = JSON.stringify(debouncedEdges);
    const currentTitle = debouncedTitle;

    // Detect changes
    const nodesChanged = currentNodes !== prevNodesRef.current;
    const edgesChanged = currentEdges !== prevEdgesRef.current;
    const titleChanged = currentTitle !== prevTitleRef.current;

    if (!nodesChanged && !edgesChanged && !titleChanged) {
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const roadmaps: Roadmap[] = stored ? JSON.parse(stored) : [];
      const roadmap = roadmaps.find((r) => r.id === roadmapId);
      const now = new Date().toISOString();

      // Upsert: Create if not exists, update if exists
      const updated: Roadmap = {
        ...(roadmap ?? {
          id: roadmapId,
          createdAt: now,
        }),
        title: debouncedTitle,
        nodes: debouncedNodes,
        edges: debouncedEdges,
        updatedAt: now,
      };

      // Save back to localStorage
      const updatedRoadmaps = roadmap
        ? roadmaps.map((r) => (r.id === roadmapId ? updated : r))
        : [...roadmaps, updated];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRoadmaps));

      // Update refs
      prevNodesRef.current = currentNodes;
      prevEdgesRef.current = currentEdges;
      prevTitleRef.current = currentTitle;
    } catch {
      // Fail silently for now - will be replaced with API error handling
    }
  }, [debouncedNodes, debouncedEdges, debouncedTitle, roadmapId, isEnabled]);
}
