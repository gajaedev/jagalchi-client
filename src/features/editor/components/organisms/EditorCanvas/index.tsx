'use client';

import { useMemo } from 'react';

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import { useFlowSync } from '../../../hooks/use-flow-sync';
import { FlowEdge } from '../../flow-edges';
import { FlowNode, FlowSection, FlowText } from '../../flow-nodes';

import type { NodeTypes, EdgeTypes } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

/**
 * EditorCanvas - React Flow wrapper component
 * Provides canvas for visual roadmap editing with custom nodes and edges
 * Syncs state with Jotai atoms via useFlowSync hook
 */
export function EditorCanvas() {
  const [nodes, , onNodesChange] = useNodesState([]);
  const [edges, , onEdgesChange] = useEdgesState([]);

  // Sync with Jotai atoms
  useFlowSync(nodes, edges);

  // Define custom node types
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      'custom-node': FlowNode,
      'custom-section': FlowSection,
      'custom-text': FlowText,
    }),
    [],
  );

  // Define custom edge types
  const edgeTypes: EdgeTypes = useMemo(
    () => ({
      'custom-edge': FlowEdge,
    }),
    [],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
