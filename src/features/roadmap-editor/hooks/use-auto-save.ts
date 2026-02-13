import { useEffect, useRef } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import { parseRoadmaps } from '../schemas/roadmap.schema';

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
const QUOTA_WARNING_THRESHOLD = 0.9; // Warn at 90% usage

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
