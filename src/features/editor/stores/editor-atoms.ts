import { atom } from 'jotai';

import type { EditorToolbarMode, SelectionType } from '../types/editor.types';
import type { Node, Edge } from '@xyflow/react';

// Toolbar 상태
export const toolbarModeAtom = atom<EditorToolbarMode | null>(null);

// React Flow 데이터
export const flowNodesAtom = atom<Node[]>([]);
export const flowEdgesAtom = atom<Edge[]>([]);

// 선택 상태
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);

// 선택 타입 (derived atom)
export const selectionTypeAtom = atom<SelectionType | null>((get) => {
  const nodeIds = get(selectedNodeIdsAtom);
  const edgeIds = get(selectedEdgeIdsAtom);

  if (nodeIds.length === 0 && edgeIds.length === 0) return null;

  if (nodeIds.length > 0 && edgeIds.length === 0) {
    return 'node';
  }

  if (nodeIds.length === 0 && edgeIds.length > 0) {
    return 'line';
  }

  return 'mixed';
});
