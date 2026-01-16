import { atom } from 'jotai';

import type { Edge, Node } from '@xyflow/react';

/**
 * React Flow nodes state
 */
export const flowNodesAtom = atom<Node[]>([]);

/**
 * React Flow edges state
 */
export const flowEdgesAtom = atom<Edge[]>([]);

/**
 * Currently selected node IDs
 */
export const selectedNodeIdsAtom = atom<string[]>([]);

/**
 * Currently selected edge IDs
 */
export const selectedEdgeIdsAtom = atom<string[]>([]);
