'use client';

import { useCallback } from 'react';

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnSelectionChangeFunc,
  type NodeTypes,
  BackgroundVariant,
  ConnectionMode,
} from '@xyflow/react';
import { useAtom, useSetAtom } from 'jotai';

import '@xyflow/react/dist/style.css';

import {
  nodesAtom,
  edgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
} from '@/features/roadmap-editor/stores/editor-atoms';
import type { RoadmapNode } from '@/features/roadmap-editor/types/editor.types';

import { useKeyboardShortcuts } from '../../../hooks/use-keyboard-shortcuts';
import { JagalchiNode } from '../../molecules/JagalchiNode';
import { JagalchiSection } from '../../molecules/JagalchiSection';
import { JagalchiText } from '../../molecules/JagalchiText';

const nodeTypes: NodeTypes = {
  'jagalchi-node': JagalchiNode,
  'jagalchi-section': JagalchiSection,
  'jagalchi-text': JagalchiText,
};

export function RoadmapCanvas() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const setSelectedNodeIds = useSetAtom(selectedNodeIdsAtom);
  const setSelectedEdgeIds = useSetAtom(selectedEdgeIdsAtom);

  // 키보드 단축키 활성화
  useKeyboardShortcuts();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as RoadmapNode[]);
    },
    [setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    ({ nodes: selectedNodes, edges: selectedEdges }) => {
      setSelectedNodeIds(selectedNodes.map((node) => node.id));
      setSelectedEdgeIds(selectedEdges.map((edge) => edge.id));
    },
    [setSelectedNodeIds, setSelectedEdgeIds],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        multiSelectionKeyCode="Shift"
        selectionKeyCode="Shift"
        deleteKeyCode="Delete"
        panOnDrag={[1, 2]}
        panOnScroll
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          label: '',
          labelStyle: { fontSize: 12, fontWeight: 400 },
          labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
        }}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[16, 16]}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
