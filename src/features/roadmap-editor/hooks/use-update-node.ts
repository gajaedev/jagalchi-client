import { useCallback } from 'react';

import { useSetAtom } from 'jotai';

import { nodesAtom, edgesAtom } from '../stores/editor-atoms';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge, Node } from '@xyflow/react';

/**
 * 노드 업데이트를 위한 공통 훅
 *
 * @param nodeId - 업데이트할 노드 ID
 * @returns updateNode - 노드 data를 부분 업데이트하는 함수
 * @returns updateNodeStyle - 노드 style을 부분 업데이트하는 함수 (크기 등)
 */
export function useUpdateNode(nodeId: string) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = useCallback(
    <T extends RoadmapNode['data']>(updates: Partial<T>) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId ? ({ ...n, data: { ...n.data, ...updates } } as RoadmapNode) : n,
        ),
      );
    },
    [nodeId, setNodes],
  );

  const updateNodeStyle = useCallback(
    (style: Partial<Node['style']>) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId ? ({ ...n, style: { ...n.style, ...style } } as RoadmapNode) : n,
        ),
      );
    },
    [nodeId, setNodes],
  );

  return { updateNode, updateNodeStyle };
}

/**
 * 엣지 업데이트를 위한 공통 훅
 *
 * @param edgeId - 업데이트할 엣지 ID
 * @returns updateEdge - 엣지를 부분 업데이트하는 함수
 */
export function useUpdateEdge(edgeId: string) {
  const setEdges = useSetAtom(edgesAtom);

  const updateEdge = useCallback(
    (updates: Partial<Edge>) => {
      setEdges((prev) => prev.map((e) => (e.id === edgeId ? { ...e, ...updates } : e)));
    },
    [edgeId, setEdges],
  );

  return { updateEdge };
}
