'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

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
  type IsValidConnection,
  type NodeMouseHandler,
  ConnectionMode,
} from '@xyflow/react';
import { useAtom, useSetAtom } from 'jotai';

import '@xyflow/react/dist/style.css';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { useKeyboardShortcuts } from '../../../hooks/use-keyboard-shortcuts';
import { sendCursorHide, sendCursorPosition } from '../../../services/action-dispatcher';
import {
  nodesAtom,
  edgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
  activeToolAtom,
} from '../../../stores/editor-atoms';
import { createId } from '../../../utils/node-factory';
import { ConnectionLine } from '../ConnectionLine';
import { DetailNode } from '../DetailNode';
import { JagalchiNode } from '../JagalchiNode';
import { JagalchiSection } from '../JagalchiSection';
import { JagalchiText } from '../JagalchiText';
import { RemoteCursors } from '../RemoteCursors';

import type { RoadmapNode } from '../../../types/editor.types';

const nodeTypes: NodeTypes = {
  'jagalchi-node': JagalchiNode,
  'jagalchi-section': JagalchiSection,
  'jagalchi-text': JagalchiText,
  'detail-node': DetailNode,
};

interface RoadmapCanvasProps {
  roadmapId?: string;
  userName?: string;
}

export function RoadmapCanvas({ roadmapId, userName = 'Unknown' }: RoadmapCanvasProps) {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const setSelectedNodeIds = useSetAtom(selectedNodeIdsAtom);
  const setSelectedEdgeIds = useSetAtom(selectedEdgeIdsAtom);
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const { screenToFlowPosition } = useReactFlow();

  // Line tool: source 노드를 기억
  const lineSourceRef = useRef<string | null>(null);

  // throttle용 타이머 ref (50ms)
  const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 키보드 단축키 활성화
  useKeyboardShortcuts();

  // 언마운트 시 커서 숨기기
  useEffect(() => {
    if (!roadmapId) return;
    return () => {
      sendCursorHide(roadmapId);
    };
  }, [roadmapId]);

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

  const isValidConnection = useCallback<IsValidConnection>((connection) => {
    // Prevent self-loops
    return connection.source !== connection.target;
  }, []);

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

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (activeTool !== 'line') return;

      if (lineSourceRef.current === null) {
        // 첫 번째 클릭: source 선택
        lineSourceRef.current = node.id;
      } else {
        // 두 번째 클릭: target 선택 → 엣지 생성
        const sourceId = lineSourceRef.current;
        lineSourceRef.current = null;

        if (sourceId !== node.id) {
          const newEdge: Edge = {
            id: createId(),
            source: sourceId,
            target: node.id,
          };
          setEdges((eds) => [...eds, newEdge]);
        }

        setActiveTool('select');
      }
    },
    [activeTool, setEdges, setActiveTool],
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
      const newNodeId = createId();
      const newNode: RoadmapNode = {
        id: newNodeId,
        type: 'jagalchi-node',
        position: { x: position.x - 100, y: position.y - 24 }, // Center the node
        data: {
          label: EDITOR_MESSAGES.NEW_NODE_LABEL,
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
          id: createId(),
          source: connectionState.fromNode.id,
          target: newNodeId,
          sourceHandle: connectionState.fromHandle?.id ?? null,
        };
        setEdges((eds) => [...eds, newEdge]);
      }
    },
    [screenToFlowPosition, setNodes, setEdges],
  );

  /** 마우스 이동 시 flow 좌표계로 변환 후 50ms throttle 전송 */
  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!roadmapId) return;
      if (throttleTimerRef.current !== null) return;

      throttleTimerRef.current = setTimeout(() => {
        throttleTimerRef.current = null;
      }, 50);

      const { clientX, clientY } = event;
      const flowPos = screenToFlowPosition({ x: clientX, y: clientY });
      sendCursorPosition(roadmapId, { userId: 0, userName, x: flowPos.x, y: flowPos.y });
    },
    [roadmapId, userName, screenToFlowPosition],
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      type: 'smoothstep',
      label: '',
      labelStyle: { fontSize: 12, fontWeight: 400 },
      labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
    }),
    [],
  );

  return (
    <div
      className={`relative h-full w-full ${activeTool === 'line' ? 'cursor-crosshair' : ''}`}
      onMouseMove={onMouseMove}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onSelectionChange={onSelectionChange}
        onNodeClick={onNodeClick}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        connectionLineComponent={ConnectionLine}
        multiSelectionKeyCode="Shift"
        selectionKeyCode="Shift"
        deleteKeyCode={null}
        panOnDrag={[1, 2]}
        panOnScroll
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[16, 16]}
      >
        <Controls position="bottom-left" />
      </ReactFlow>
      <RemoteCursors />
    </div>
  );
}
