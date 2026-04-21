import type { Roadmap, CreateRoadmapInput } from '@/types/roadmap.types';

import { parseRoadmaps } from './roadmap-schema';

export const STORAGE_KEY = 'jagalchi-roadmaps-v1';

export function createEmptyRoadmap(id: number, input?: CreateRoadmapInput): Roadmap {
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

export function loadRoadmapFromLocalStorage(id: number): Roadmap | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const roadmaps = parseRoadmaps(stored) as Roadmap[];
    return roadmaps.find((r) => r.id === id) || null;
  } catch {
    return null;
  }
}

export function saveRoadmapToLocalStorage(roadmap: Roadmap): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const roadmaps = stored ? (parseRoadmaps(stored) as Roadmap[]) : [];

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
