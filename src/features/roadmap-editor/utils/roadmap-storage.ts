import type { Roadmap, CreateRoadmapInput } from '../types/roadmap.types';

const STORAGE_KEY = 'jagalchi-roadmaps';

export function createEmptyRoadmap(id: string, input?: CreateRoadmapInput): Roadmap {
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

export function loadRoadmapFromLocalStorage(id: string): Roadmap | null {
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

export function saveRoadmapToLocalStorage(roadmap: Roadmap): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    let roadmaps: Roadmap[] = stored ? JSON.parse(stored) : [];

    const index = roadmaps.findIndex((r) => r.id === roadmap.id);
    if (index !== -1) {
      roadmaps[index] = { ...roadmap, updatedAt: new Date().toISOString() };
    } else {
      roadmaps.push(roadmap);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(roadmaps));
  } catch {
    // Fail silently - will be replaced with API error handling
  }
}
