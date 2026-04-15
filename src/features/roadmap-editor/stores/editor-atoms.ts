import { atom } from 'jotai';
import { withHistory, UNDO, REDO } from 'jotai-history';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

/** 원격 커서 상태 타입 */
export interface RemoteCursor {
  userName: string;
  x: number;
  y: number;
  state: 'NORMAL' | 'EDITING' | 'DRAGGING' | 'SELECTING' | 'IDLE';
}

/**
 * Combined state for synchronized undo/redo
 * Prevents desynchronization between nodes and edges history
 */
interface EditorState {
  nodes: RoadmapNode[];
  edges: Edge[];
}

// Single history atom for combined state (prevents desync)
const editorStateBaseAtom = atom<EditorState>({ nodes: [], edges: [] });
export const editorStateHistoryAtom = withHistory(editorStateBaseAtom, 100);

// Current state atoms (for compatibility)
export const nodesAtom = atom(
  (get) => {
    const [current] = get(editorStateHistoryAtom);
    return current.nodes;
  },
  (get, set, update: RoadmapNode[] | ((prev: RoadmapNode[]) => RoadmapNode[])) => {
    const [current] = get(editorStateHistoryAtom);
    const newNodes = typeof update === 'function' ? update(current.nodes) : update;
    set(editorStateHistoryAtom, { ...current, nodes: newNodes });
  },
);

export const edgesAtom = atom(
  (get) => {
    const [current] = get(editorStateHistoryAtom);
    return current.edges;
  },
  (get, set, update: Edge[] | ((prev: Edge[]) => Edge[])) => {
    const [current] = get(editorStateHistoryAtom);
    const newEdges = typeof update === 'function' ? update(current.edges) : update;
    set(editorStateHistoryAtom, { ...current, edges: newEdges });
  },
);
export const roadmapTitleAtom = atom<string>('Jagalchi Roadmap');

// Selection state
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);

// Derived atoms (optimized with Set for O(1) lookup)
export const selectedNodesAtom = atom((get) => {
  const nodes = get(nodesAtom);
  const selectedIds = get(selectedNodeIdsAtom);
  const selectedIdsSet = new Set(selectedIds);
  return nodes.filter((node) => selectedIdsSet.has(node.id));
});

export const selectedEdgesAtom = atom((get) => {
  const edges = get(edgesAtom);
  const selectedIds = get(selectedEdgeIdsAtom);
  const selectedIdsSet = new Set(selectedIds);
  return edges.filter((edge) => selectedIdsSet.has(edge.id));
});

export const singleSelectedNodeAtom = atom((get) => {
  const selected = get(selectedNodesAtom);
  return selected.length === 1 ? selected[0] : null;
});

export const singleSelectedEdgeAtom = atom((get) => {
  const selected = get(selectedEdgesAtom);
  return selected.length === 1 ? selected[0] : null;
});

/** 다른 유저의 커서 위치 맵 (userId → RemoteCursor) */
export const remoteCursorsAtom = atom<Map<string, RemoteCursor>>(new Map());

// ColorPicker state
export const isColorPickerOpenAtom = atom<boolean>(false);
export const colorPickerTargetAtom = atom<
  { type: 'node' | 'text'; nodeId: string } | { type: 'edge'; edgeId: string } | null
>(null);

// Toolbar state
export const activeToolAtom = atom<'select' | 'node' | 'line' | 'section' | 'text'>('select');

// Undo/Redo atoms (now synchronized via single history)
export const undoAtom = atom(null, (get, set) => {
  set(editorStateHistoryAtom, UNDO);
});

export const redoAtom = atom(null, (get, set) => {
  set(editorStateHistoryAtom, REDO);
});

export const canUndoAtom = atom((get) => {
  const history = get(editorStateHistoryAtom);
  return history.canUndo;
});

export const canRedoAtom = atom((get) => {
  const history = get(editorStateHistoryAtom);
  return history.canRedo;
});
