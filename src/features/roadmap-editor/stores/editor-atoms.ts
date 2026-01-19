import { atom } from 'jotai';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

// Core state
export const nodesAtom = atom<RoadmapNode[]>([]);
export const edgesAtom = atom<Edge[]>([]);
export const roadmapTitleAtom = atom<string>('Jagalchi Roadmap');

// Selection state
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);

// Derived atoms
export const selectedNodesAtom = atom((get) => {
  const nodes = get(nodesAtom);
  const selectedIds = get(selectedNodeIdsAtom);
  return nodes.filter((node) => selectedIds.includes(node.id));
});

export const selectedEdgesAtom = atom((get) => {
  const edges = get(edgesAtom);
  const selectedIds = get(selectedEdgeIdsAtom);
  return edges.filter((edge) => selectedIds.includes(edge.id));
});

export const singleSelectedNodeAtom = atom((get) => {
  const selected = get(selectedNodesAtom);
  return selected.length === 1 ? selected[0] : null;
});

export const singleSelectedEdgeAtom = atom((get) => {
  const selected = get(selectedEdgesAtom);
  return selected.length === 1 ? selected[0] : null;
});

// ColorPicker state
export const isColorPickerOpenAtom = atom<boolean>(false);
export const colorPickerTargetAtom = atom<{
  type: 'node' | 'text';
  nodeId: string;
} | null>(null);

// Toolbar state
export const activeToolAtom = atom<'select' | 'node' | 'line' | 'section' | 'text'>('select');
