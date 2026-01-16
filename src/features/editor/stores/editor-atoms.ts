import { atom } from 'jotai';

import type { EditorToolbarMode, SaveStatus, SelectionType } from '../types/editor.types';
import type { Node, Edge } from '@xyflow/react';

/**
 * Toolbar mode state
 * null indicates no mode is active (default/selection mode)
 */
export const editorToolbarModeAtom = atom<EditorToolbarMode | null>(null);

/**
 * Selected node IDs
 */
export const selectedNodeIdsAtom = atom<string[]>([]);

/**
 * Selected edge IDs
 */
export const selectedEdgeIdsAtom = atom<string[]>([]);

/**
 * Derived atom: current selection type
 * Determines which sidebar to display based on selection
 */
export const selectionTypeAtom = atom<SelectionType | null>((get) => {
  const nodeIds = get(selectedNodeIdsAtom);
  const edgeIds = get(selectedEdgeIdsAtom);
  const nodes = get(flowNodesAtom);

  // No selection
  if (nodeIds.length === 0 && edgeIds.length === 0) {
    return null;
  }

  // Multiple items selected (mixed)
  if (nodeIds.length + edgeIds.length > 1) {
    return 'mixed';
  }

  // Single node selected - determine node type
  if (nodeIds.length === 1) {
    const node = nodes.find((n) => n.id === nodeIds[0]);
    if (!node) return null;

    switch (node.type) {
      case 'custom-node':
        return 'node';
      case 'custom-section':
        return 'section';
      case 'custom-text':
        return 'text';
      default:
        return 'node';
    }
  }

  // Single edge selected
  if (edgeIds.length === 1) {
    return 'line';
  }

  return null;
});

/**
 * React Flow nodes data (synchronized with React Flow state)
 */
export const flowNodesAtom = atom<Node[]>([]);

/**
 * React Flow edges data (synchronized with React Flow state)
 */
export const flowEdgesAtom = atom<Edge[]>([]);

/**
 * Sidebar open/close state
 */
export const sidebarOpenAtom = atom<boolean>(false);

/**
 * Save status for the roadmap
 */
export const saveStatusAtom = atom<SaveStatus>('default');

/**
 * Roadmap title
 */
export const roadmapTitleAtom = atom<string>('새 로드맵');

/**
 * Roadmap lock status
 * When locked, the roadmap is read-only
 */
export const roadmapIsLockedAtom = atom<boolean>(false);
