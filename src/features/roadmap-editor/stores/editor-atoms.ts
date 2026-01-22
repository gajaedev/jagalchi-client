import { atom } from 'jotai';
import { withHistory, UNDO, REDO } from 'jotai-history';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

// Core state with history
const nodesBaseAtom = atom<RoadmapNode[]>([]);
const edgesBaseAtom = atom<Edge[]>([]);

export const nodesHistoryAtom = withHistory(nodesBaseAtom, 100);
export const edgesHistoryAtom = withHistory(edgesBaseAtom, 100);

// Current state atoms (for compatibility)
export const nodesAtom = atom(
  (get) => {
    const [current] = get(nodesHistoryAtom);
    return current;
  },
  (get, set, update: RoadmapNode[] | ((prev: RoadmapNode[]) => RoadmapNode[])) => {
    const [current] = get(nodesHistoryAtom);
    const newValue = typeof update === 'function' ? update(current) : update;
    set(nodesHistoryAtom, newValue);
  },
);

export const edgesAtom = atom(
  (get) => {
    const [current] = get(edgesHistoryAtom);
    return current;
  },
  (get, set, update: Edge[] | ((prev: Edge[]) => Edge[])) => {
    const [current] = get(edgesHistoryAtom);
    const newValue = typeof update === 'function' ? update(current) : update;
    set(edgesHistoryAtom, newValue);
  },
);
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

// Undo/Redo atoms
export const undoAtom = atom(null, (get, set) => {
  set(nodesHistoryAtom, UNDO);
  set(edgesHistoryAtom, UNDO);
});

export const redoAtom = atom(null, (get, set) => {
  set(nodesHistoryAtom, REDO);
  set(edgesHistoryAtom, REDO);
});

export const canUndoAtom = atom((get) => {
  const nodesHistory = get(nodesHistoryAtom);
  const edgesHistory = get(edgesHistoryAtom);
  return nodesHistory.canUndo || edgesHistory.canUndo;
});

export const canRedoAtom = atom((get) => {
  const nodesHistory = get(nodesHistoryAtom);
  const edgesHistory = get(edgesHistoryAtom);
  return nodesHistory.canRedo || edgesHistory.canRedo;
});
