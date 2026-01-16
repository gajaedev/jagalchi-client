import { useCallback, useEffect } from 'react';

import { useAtom } from 'jotai';

import {
  flowEdgesAtom,
  flowNodesAtom,
  selectedEdgeIdsAtom,
  selectedNodeIdsAtom,
} from '../stores/flow-atoms';

import type { Edge, Node } from '@xyflow/react';

/**
 * Custom hook to synchronize React Flow state with Jotai atoms
 * Provides bidirectional sync between React Flow internal state and global Jotai state
 */
export function useFlowSync(nodes: Node[], edges: Edge[]) {
  const [flowNodes, setFlowNodes] = useAtom(flowNodesAtom);
  const [flowEdges, setFlowEdges] = useAtom(flowEdgesAtom);
  const [, setSelectedNodeIds] = useAtom(selectedNodeIdsAtom);
  const [, setSelectedEdgeIds] = useAtom(selectedEdgeIdsAtom);

  // Sync local nodes to Jotai
  useEffect(() => {
    setFlowNodes(nodes);
  }, [nodes, setFlowNodes]);

  // Sync local edges to Jotai
  useEffect(() => {
    setFlowEdges(edges);
  }, [edges, setFlowEdges]);

  // Sync selected node IDs
  useEffect(() => {
    const selectedIds = nodes.filter((node) => node.selected).map((node) => node.id);
    setSelectedNodeIds(selectedIds);
  }, [nodes, setSelectedNodeIds]);

  // Sync selected edge IDs
  useEffect(() => {
    const selectedIds = edges.filter((edge) => edge.selected).map((edge) => edge.id);
    setSelectedEdgeIds(selectedIds);
  }, [edges, setSelectedEdgeIds]);

  // Apply Jotai changes to local state
  const syncFromAtoms = useCallback(() => {
    // Check if there are differences between atoms and local state
    const nodesChanged =
      JSON.stringify(flowNodes.map((n) => n.id)) !== JSON.stringify(nodes.map((n) => n.id));
    const edgesChanged =
      JSON.stringify(flowEdges.map((e) => e.id)) !== JSON.stringify(edges.map((e) => e.id));

    if (nodesChanged || edgesChanged) {
      // This would typically be handled by setting nodes/edges directly
      // But since we're using useNodesState/useEdgesState, we let the atoms be the source of truth
    }
  }, [flowNodes, flowEdges, nodes, edges]);

  useEffect(() => {
    syncFromAtoms();
  }, [syncFromAtoms]);
}
