'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { nodesAtom, edgesAtom } from '../stores/editor-atoms';

import type { StompAction } from '../services/action-dispatcher';
import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

interface NackDetail {
  actionId: string;
  actionType: string;
  errorCode: string;
  errorMessage: string;
  action: StompAction | undefined;
}

/**
 * NACK 롤백 훅.
 * `jagalchi:realtime-nack` CustomEvent를 수신하여
 * 거부된 액션의 이전 상태(prev)로 노드/엣지를 복원.
 */
export function useNackRollback() {
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);

  useEffect(() => {
    const handleNack = (event: Event) => {
      const { action } = (event as CustomEvent<NackDetail>).detail;
      if (!action?.payload) return;

      const { payload } = action;
      const targetType = payload.target?.type;
      const targetId = payload.target?.object;
      const prev = payload.prev;

      if (!targetId || !prev) return;

      if (targetType === 'NODE' || targetType === 'SECTION' || targetType === 'TEXT') {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id !== targetId) return node;
            return {
              ...node,
              position:
                prev.x !== undefined && prev.y !== undefined
                  ? { x: prev.x, y: prev.y }
                  : node.position,
              data: prev.label !== undefined ? { ...node.data, label: prev.label } : node.data,
            } as RoadmapNode;
          }),
        );
      } else if (targetType === 'EDGE') {
        setEdges((edges) =>
          edges.map((edge) => {
            if (edge.id !== targetId) return edge;
            return { ...edge, ...prev } as Edge;
          }),
        );
      }
    };

    window.addEventListener('jagalchi:realtime-nack', handleNack);
    return () => {
      window.removeEventListener('jagalchi:realtime-nack', handleNack);
    };
  }, [setNodes, setEdges]);
}
