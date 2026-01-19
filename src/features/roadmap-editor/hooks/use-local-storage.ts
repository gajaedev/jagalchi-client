import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { nodesAtom, edgesAtom, roadmapTitleAtom } from '../stores/editor-atoms';

import type { RoadmapNode } from '../types/editor.types';
import type { Edge } from '@xyflow/react';

const STORAGE_KEY = 'jagalchi-roadmap-editor';

interface StoredData {
  title: string;
  nodes: RoadmapNode[];
  edges: Edge[];
  version: string;
}

/**
 * LocalStorage에 에디터 상태를 자동 저장/로드하는 hook
 * - 마운트 시 자동 로드
 * - 노드/엣지/타이틀 변경 시 자동 저장 (debounced)
 */
export function useLocalStorage() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [title, setTitle] = useAtom(roadmapTitleAtom);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const data: StoredData = JSON.parse(stored);
      setNodes(data.nodes);
      setEdges(data.edges);
      setTitle(data.title);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load from localStorage:', error);
    }
  }, [setNodes, setEdges, setTitle]);

  // Save to localStorage on change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const data: StoredData = {
        title,
        nodes,
        edges,
        version: '1.0',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, title]);
}
