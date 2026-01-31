'use client';

import { useCallback } from 'react';

import {
  ReactFlow,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnSelectionChangeFunc,
  type OnConnectEnd,
  type NodeTypes,
  type DefaultEdgeOptions,
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
import { ConnectionLine } from '../../molecules/ConnectionLine';
import { JagalchiNode } from '../../molecules/JagalchiNode';
import { JagalchiSection } from '../../molecules/JagalchiSection';
import { JagalchiText } from '../../molecules/JagalchiText';

const NODE_TYPES: NodeTypes = {
  'jagalchi-node': JagalchiNode,
  'jagalchi-section': JagalchiSection,
  'jagalchi-text': JagalchiText,
};

const DEFAULT_EDGE_OPTIONS: DefaultEdgeOptions = {
  type: 'smoothstep',
  label: '',
  labelStyle: { fontSize: 12, fontWeight: 400 },
  labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
};

const SNAP_GRID: [number, number] = [16, 16];
const FIT_VIEW_OPTIONS = { padding: 0.2 };

export function RoadmapCanvas() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const setSelectedNodeIds = useSetAtom(selectedNodeIdsAtom);
  const setSelectedEdgeIds = useSetAtom(selectedEdgeIdsAtom);
  const { screenToFlowPosition } = useReactFlow();

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

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // Only create node if connection ended on empty space (not on another node)
      if (connectionState.toNode) return;

      // Get mouse position
      const targetIsPane = (event.target as HTMLElement).classList.contains('react-flow__pane');
      if (!targetIsPane) return;

      const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
      const position = screenToFlowPosition({ x: clientX, y: clientY });

      // Create new node at drop position
      const timestamp = Date.now();
      const newNodeId = `node-${timestamp}`;
      const newNode: RoadmapNode = {
        id: newNodeId,
        type: 'jagalchi-node',
        position: { x: position.x - 100, y: position.y - 24 },
        data: {
          label: 'New Node',
          description: '',
          resources: [],
          variant: 'white',
          isLocked: false,
        },
      };

      // Add new node
      setNodes((nds) => [...nds, newNode]);

      // Create edge connecting source to new node
      if (connectionState.fromNode) {
        const newEdge: Edge = {
          id: `edge-${timestamp}`,
          source: connectionState.fromNode.id,
          target: newNodeId,
          sourceHandle: connectionState.fromHandle?.id ?? null,
        };
        setEdges((eds) => [...eds, newEdge]);
      }
    },
    [screenToFlowPosition, setNodes, setEdges],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onSelectionChange={onSelectionChange}
        nodeTypes={NODE_TYPES}
        connectionLineComponent={ConnectionLine}
        multiSelectionKeyCode="Shift"
        selectionKeyCode="Shift"
        deleteKeyCode="Delete"
        panOnDrag={[1, 2]}
        panOnScroll
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={SNAP_GRID}
      >
        <Controls position="bottom-left" />
      </ReactFlow>
    </div>
  );
}
