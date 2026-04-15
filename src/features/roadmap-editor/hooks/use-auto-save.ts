import { useEffect, useRef } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import { parseRoadmaps } from '../schemas/roadmap.schema';
import { dispatchAction } from '../services/action-dispatcher';
import { STORAGE_KEY } from '../services/roadmap-storage';

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

const isRealtimeEnabled = process.env.NEXT_PUBLIC_REALTIME_ENABLED === 'true';
const QUOTA_WARNING_THRESHOLD = 0.9; // Warn at 90% usage

/**
 * Check localStorage quota and return usage percentage
 * Returns null if quota check is not supported
 */
function checkStorageQuota(): number | null {
  try {
    // Estimate current usage
    let totalSize = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        totalSize += (localStorage[key]?.length ?? 0) + key.length;
      }
    }

    // Most browsers have 5-10MB limit, use conservative 5MB
    const estimatedQuota = 5 * 1024 * 1024; // 5MB in bytes
    return totalSize / estimatedQuota;
  } catch {
    return null;
  }
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

    // Use JSON.stringify for accurate change detection (debounced, so performance is fine)
    const currentNodesHash = JSON.stringify(debouncedNodes);
    const currentEdgesHash = JSON.stringify(debouncedEdges);
    const currentTitle = debouncedTitle;

    // Detect changes
    const nodesChanged = currentNodesHash !== prevNodesRef.current;
    const edgesChanged = currentEdgesHash !== prevEdgesRef.current;
    const titleChanged = currentTitle !== prevTitleRef.current;

    if (!nodesChanged && !edgesChanged && !titleChanged) {
      return;
    }

    // Realtime mode: send STOMP action instead of localStorage
    if (isRealtimeEnabled) {
      dispatchAction(roadmapId, 'EDIT', {
        type: 'INFO',
        target: { type: 'NODE', object: roadmapId },
        data: { title: debouncedTitle },
      });
      prevNodesRef.current = currentNodesHash;
      prevEdgesRef.current = currentEdgesHash;
      prevTitleRef.current = currentTitle;
      return;
    }

    try {
      // Check storage quota before attempting to save
      const quotaUsage = checkStorageQuota();
      if (quotaUsage !== null && quotaUsage > QUOTA_WARNING_THRESHOLD) {
        // eslint-disable-next-line no-console
        console.warn(
          `localStorage quota usage: ${(quotaUsage * 100).toFixed(1)}%. Consider clearing old data.`,
        );
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      // Use Zod validation to prevent corruption/security issues
      const roadmaps = parseRoadmaps(stored) as Roadmap[];
      const numericId = Number(roadmapId);
      const roadmap = roadmaps.find((r) => r.id === numericId);
      const now = new Date().toISOString();

      // Upsert: Create if not exists, update if exists
      const updated: Roadmap = {
        ...(roadmap ?? {
          id: numericId,
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
        ? roadmaps.map((r) => (r.id === numericId ? updated : r))
        : [...roadmaps, updated];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRoadmaps));

      // Update refs with new hashes
      prevNodesRef.current = currentNodesHash;
      prevEdgesRef.current = currentEdgesHash;
      prevTitleRef.current = currentTitle;
    } catch (error) {
      // Handle quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // eslint-disable-next-line no-console
        console.error('localStorage quota exceeded. Unable to save roadmap.');
      }
      // Other errors fail silently - will be replaced with API error handling
    }
  }, [debouncedNodes, debouncedEdges, debouncedTitle, roadmapId, isEnabled]);
}
