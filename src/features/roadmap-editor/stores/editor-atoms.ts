import { atom } from 'jotai';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

// Phase 1에서는 사용하지 않지만, Phase 2를 위해 구조만 준비
export const nodesAtom = atom<RoadmapNode[]>([]);
export const edgesAtom = atom<Edge[]>([]);
export const selectedNodeIdsAtom = atom<string[]>([]);
