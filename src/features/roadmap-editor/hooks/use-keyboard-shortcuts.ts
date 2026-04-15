'use client';

import { useEffect, useRef } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { z } from 'zod';

import {
  nodesAtom,
  edgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
  undoAtom,
  redoAtom,
  editorStateHistoryAtom,
} from '../stores/editor-atoms';
import { createId } from '../utils/node-factory';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

// Clipboard validation schema
const roadmapNodeDataSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  resources: z.array(z.string()).optional(),
  variant: z.string().optional(),
  isLocked: z.boolean().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.string().optional(),
});

const roadmapNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: roadmapNodeDataSchema,
  style: z.record(z.string(), z.unknown()).optional(),
});

const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().nullable().optional(),
  targetHandle: z.string().nullable().optional(),
  type: z.string().optional(),
  animated: z.boolean().optional(),
  style: z.record(z.string(), z.unknown()).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

const clipboardSchema = z.object({
  nodes: z.array(roadmapNodeSchema),
  edges: z.array(edgeSchema).optional(),
});

/**
 * 키보드 단축키 핸들러
 * - Delete: 선택된 노드/엣지 삭제
 * - Ctrl+Z: Undo
 * - Ctrl+Shift+Z: Redo
 * - Ctrl+C: 복사
 * - Ctrl+V: 붙여넣기
 * - Ctrl+A: 전체 선택
 * - Ctrl+D: 복제
 * - ESC: 선택 해제
 *
 * Performance: Uses refs to avoid recreating event handlers on every state change
 */
export function useKeyboardShortcuts() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [selectedNodeIds, setSelectedNodeIds] = useAtom(selectedNodeIdsAtom);
  const [selectedEdgeIds, setSelectedEdgeIds] = useAtom(selectedEdgeIdsAtom);
  const undo = useSetAtom(undoAtom);
  const redo = useSetAtom(redoAtom);
  const setEditorState = useSetAtom(editorStateHistoryAtom);

  // Use refs to access latest values without triggering effect re-runs
  const nodesRef = useRef<RoadmapNode[]>(nodes);
  const edgesRef = useRef<Edge[]>(edges);
  const selectedNodeIdsRef = useRef<string[]>(selectedNodeIds);
  const selectedEdgeIdsRef = useRef<string[]>(selectedEdgeIds);

  // Update refs when values change
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    edgesRef.current = edges;
  }, [edges]);

  useEffect(() => {
    selectedNodeIdsRef.current = selectedNodeIds;
  }, [selectedNodeIds]);

  useEffect(() => {
    selectedEdgeIdsRef.current = selectedEdgeIds;
  }, [selectedEdgeIds]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Input/Textarea에서는 단축키 무시
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Delete - 선택된 노드/엣지 삭제
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        const currentSelectedNodeIds = selectedNodeIdsRef.current;
        const currentSelectedEdgeIds = selectedEdgeIdsRef.current;

        if (currentSelectedNodeIds.length > 0 || currentSelectedEdgeIds.length > 0) {
          // Convert to Set for O(1) lookups instead of O(n)
          const selectedNodeIdsSet = new Set(currentSelectedNodeIds);
          const selectedEdgeIdsSet = new Set(currentSelectedEdgeIds);

          setNodes((nds) => nds.filter((node) => !selectedNodeIdsSet.has(node.id)));
          // Remove selected edges AND orphaned edges connected to deleted nodes
          setEdges((eds) =>
            eds.filter(
              (edge) =>
                !selectedEdgeIdsSet.has(edge.id) &&
                !selectedNodeIdsSet.has(edge.source) &&
                !selectedNodeIdsSet.has(edge.target),
            ),
          );
          setSelectedNodeIds([]);
          setSelectedEdgeIds([]);
        }
        return;
      }

      // Ctrl/Cmd 키 체크
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      if (!isCtrlOrCmd) {
        // ESC - 선택 해제
        if (event.key === 'Escape') {
          event.preventDefault();
          setSelectedNodeIds([]);
          setSelectedEdgeIds([]);
        }
        return;
      }

      // Ctrl+Z - Undo
      if (event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }

      // Ctrl+Shift+Z - Redo
      if (event.key === 'z' && event.shiftKey) {
        event.preventDefault();
        redo();
        return;
      }

      // Ctrl+A - 전체 선택
      if (event.key === 'a') {
        event.preventDefault();
        setSelectedNodeIds(nodesRef.current.map((node: RoadmapNode) => node.id));
        setSelectedEdgeIds(edgesRef.current.map((edge: { id: string }) => edge.id));
        return;
      }

      // Ctrl+C - 복사
      if (event.key === 'c') {
        event.preventDefault();
        // Convert to Set for O(1) lookups
        const selectedNodeIdsSet = new Set(selectedNodeIdsRef.current);

        const selectedNodes = nodesRef.current.filter((node: RoadmapNode) =>
          selectedNodeIdsSet.has(node.id),
        );

        // 선택된 노드들을 연결하는 엣지도 복사
        const selectedEdges = edgesRef.current.filter(
          (edge: Edge) =>
            selectedNodeIdsSet.has(edge.source) && selectedNodeIdsSet.has(edge.target),
        );

        if (selectedNodes.length > 0) {
          // 노드와 엣지를 함께 저장
          localStorage.setItem(
            'jagalchi-clipboard',
            JSON.stringify({
              nodes: selectedNodes,
              edges: selectedEdges,
            }),
          );
        }
        return;
      }

      // Ctrl+V - 붙여넣기
      if (event.key === 'v') {
        event.preventDefault();
        const clipboard = localStorage.getItem('jagalchi-clipboard');
        if (clipboard) {
          try {
            const parsed = JSON.parse(clipboard);
            const result = clipboardSchema.safeParse(parsed);

            if (!result.success) {
              // eslint-disable-next-line no-console
              console.warn('Invalid clipboard data:', result.error);
              return;
            }

            const { nodes: copiedNodes, edges: copiedEdges = [] } = result.data;

            // ID 매핑 생성 (old ID -> new ID)
            const idMap = new Map<string, string>();
            const newNodes = copiedNodes.map((node) => {
              const newId = createId();
              idMap.set(node.id, newId);
              return {
                ...node,
                id: newId,
                position: {
                  x: node.position.x + 50,
                  y: node.position.y + 50,
                },
              } as RoadmapNode;
            });

            // Edges ID 리매핑
            const newEdges = copiedEdges.map((edge) => ({
              ...edge,
              id: createId(),
              source: idMap.get(edge.source) || edge.source,
              target: idMap.get(edge.target) || edge.target,
            })) as Edge[];

            setNodes((nds) => [...nds, ...newNodes]);
            setEdges((eds) => [...eds, ...newEdges]);
            setSelectedNodeIds(newNodes.map((node) => node.id));
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Paste error:', error);
          }
        }
        return;
      }

      // Ctrl+D - 복제
      if (event.key === 'd') {
        event.preventDefault();
        // Convert to Set for O(1) lookups
        const selectedNodeIdsSet = new Set(selectedNodeIdsRef.current);

        const selectedNodes = nodesRef.current.filter((node: RoadmapNode) =>
          selectedNodeIdsSet.has(node.id),
        );
        if (selectedNodes.length > 0) {
          // Build old→new ID mapping for edge remapping
          const idMap = new Map<string, string>();
          const duplicatedNodes = selectedNodes.map((node: RoadmapNode) => {
            const newId = createId();
            idMap.set(node.id, newId);
            return {
              ...node,
              id: newId,
              position: {
                x: node.position.x + 50,
                y: node.position.y + 50,
              },
            };
          });

          // Duplicate edges whose both endpoints are among the selected nodes
          const duplicatedEdges = edgesRef.current
            .filter(
              (edge: Edge) =>
                selectedNodeIdsSet.has(edge.source) && selectedNodeIdsSet.has(edge.target),
            )
            .map((edge: Edge) => ({
              ...edge,
              id: createId(),
              source: idMap.get(edge.source) ?? edge.source,
              target: idMap.get(edge.target) ?? edge.target,
            }));

          // Update nodes and edges atomically in a single history entry
          setEditorState({
            nodes: [...nodesRef.current, ...duplicatedNodes],
            edges: [...edgesRef.current, ...duplicatedEdges],
          });
          setSelectedNodeIds(duplicatedNodes.map((node: RoadmapNode) => node.id));
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // Only depend on stable setters - refs handle value updates
  }, [setNodes, setEdges, setSelectedNodeIds, setSelectedEdgeIds, undo, redo, setEditorState]);
}
