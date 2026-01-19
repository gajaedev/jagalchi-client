'use client';

import { useCallback } from 'react';

import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type NodeTypes,
  type Edge,
  BackgroundVariant,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { RoadmapNode } from '@/features/roadmap-editor/types/editor.types';

import { JagalchiNode } from '../../molecules/JagalchiNode';
import { JagalchiSection } from '../../molecules/JagalchiSection';
import { JagalchiText } from '../../molecules/JagalchiText';

interface RoadmapCanvasProps {
  initialNodes?: RoadmapNode[];
  initialEdges?: Edge[];
}

const nodeTypes: NodeTypes = {
  'jagalchi-node': JagalchiNode,
  'jagalchi-section': JagalchiSection,
  'jagalchi-text': JagalchiText,
};

export function RoadmapCanvas({ initialNodes = [], initialEdges = [] }: RoadmapCanvasProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          // Phase 1: 엣지 라벨 기본값 (Phase 2에서 사이드바로 편집 가능)
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
