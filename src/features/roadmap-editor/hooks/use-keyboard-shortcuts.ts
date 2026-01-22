'use client';

import { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import {
  nodesAtom,
  edgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
  undoAtom,
  redoAtom,
} from '../stores/editor-atoms';

import type { RoadmapNode } from '../types/editor.types';

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
 */
export function useKeyboardShortcuts() {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [selectedNodeIds, setSelectedNodeIds] = useAtom(selectedNodeIdsAtom);
  const [selectedEdgeIds, setSelectedEdgeIds] = useAtom(selectedEdgeIdsAtom);
  const undo = useSetAtom(undoAtom);
  const redo = useSetAtom(redoAtom);

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
        if (selectedNodeIds.length > 0 || selectedEdgeIds.length > 0) {
          setNodes((nds) => nds.filter((node) => !selectedNodeIds.includes(node.id)));
          setEdges((eds) => eds.filter((edge) => !selectedEdgeIds.includes(edge.id)));
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
        setSelectedNodeIds(nodes.map((node: RoadmapNode) => node.id));
        setSelectedEdgeIds(edges.map((edge: { id: string }) => edge.id));
        return;
      }

      // Ctrl+C - 복사
      if (event.key === 'c') {
        event.preventDefault();
        const selectedNodes = nodes.filter((node: RoadmapNode) =>
          selectedNodeIds.includes(node.id),
        );
        if (selectedNodes.length > 0) {
          // localStorage에 복사된 노드 저장
          localStorage.setItem('jagalchi-clipboard', JSON.stringify(selectedNodes));
        }
        return;
      }

      // Ctrl+V - 붙여넣기
      if (event.key === 'v') {
        event.preventDefault();
        const clipboard = localStorage.getItem('jagalchi-clipboard');
        if (clipboard) {
          try {
            const copiedNodes = JSON.parse(clipboard) as RoadmapNode[];
            const newNodes = copiedNodes.map((node: RoadmapNode) => ({
              ...node,
              id: `${node.id}-copy-${Date.now()}`,
              position: {
                x: node.position.x + 50,
                y: node.position.y + 50,
              },
            }));
            setNodes((nds) => [...nds, ...newNodes]);
            setSelectedNodeIds(newNodes.map((node: RoadmapNode) => node.id));
          } catch {
            // JSON parse 실패 시 무시
          }
        }
        return;
      }

      // Ctrl+D - 복제
      if (event.key === 'd') {
        event.preventDefault();
        const selectedNodes = nodes.filter((node: RoadmapNode) =>
          selectedNodeIds.includes(node.id),
        );
        if (selectedNodes.length > 0) {
          const duplicatedNodes = selectedNodes.map((node: RoadmapNode) => ({
            ...node,
            id: `${node.id}-dup-${Date.now()}`,
            position: {
              x: node.position.x + 50,
              y: node.position.y + 50,
            },
          }));
          setNodes((nds) => [...nds, ...duplicatedNodes]);
          setSelectedNodeIds(duplicatedNodes.map((node: RoadmapNode) => node.id));
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    nodes,
    edges,
    selectedNodeIds,
    selectedEdgeIds,
    setNodes,
    setEdges,
    setSelectedNodeIds,
    setSelectedEdgeIds,
    undo,
    redo,
  ]);
}
