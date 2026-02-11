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

/**
 * Fast hash function for array comparison (faster than JSON.stringify)
 * Uses array length + item count + sample IDs for quick change detection
 */
function fastArrayHash(arr: unknown[]): string {
  if (!arr.length) return '0';
  const first = arr[0] as { id?: string };
  const last = arr[arr.length - 1] as { id?: string };
  return `${arr.length}-${first.id ?? ''}-${last.id ?? ''}`;
}

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

    // Use fast hash instead of expensive JSON.stringify for comparison
    const currentNodesHash = fastArrayHash(debouncedNodes);
    const currentEdgesHash = fastArrayHash(debouncedEdges);
    const currentTitle = debouncedTitle;

    // Detect changes
    const nodesChanged = currentNodesHash !== prevNodesRef.current;
    const edgesChanged = currentEdgesHash !== prevEdgesRef.current;
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
          isPublic: false,
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

      // Update refs with new hashes
      prevNodesRef.current = currentNodesHash;
      prevEdgesRef.current = currentEdgesHash;
      prevTitleRef.current = currentTitle;
    } catch {
      // Fail silently for now - will be replaced with API error handling
    }
  }, [debouncedNodes, debouncedEdges, debouncedTitle, roadmapId, isEnabled]);
}
