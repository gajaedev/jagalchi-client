import { atom } from 'jotai';

import type { SelectionType } from '../types/editor.types';
import type { Node, Edge } from '@xyflow/react';

// Sidebar state
export const sidebarOpenAtom = atom<boolean>(false);
export const selectionTypeAtom = atom<SelectionType | null>(null);

// React Flow state - nodes can be of different types (FlowNodeData | FlowSectionData | FlowTextData)
// Using `any` here because React Flow Node type requires Record<string, unknown>
// Type safety is enforced in useSidebarData hook with type guards
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flowNodesAtom = atom<Node<any>[]>([]);
export const flowEdgesAtom = atom<Edge[]>([]);

// Selection state
export const selectedNodeIdsAtom = atom<string[]>([]);
export const selectedEdgeIdsAtom = atom<string[]>([]);
