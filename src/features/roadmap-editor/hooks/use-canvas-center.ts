import { useCallback } from 'react';

import { useReactFlow } from '@xyflow/react';

/**
 * 현재 뷰포트 중앙 좌표를 반환하는 hook
 * 노드 생성 시 현재 보고 있는 화면 중앙에 배치하기 위해 사용
 */
export function useCanvasCenter() {
  const { screenToFlowPosition } = useReactFlow();

  return useCallback(() => {
    const centerX = window.innerWidth / 2 - 120; // 240px sidebar 너비의 절반
    const centerY = window.innerHeight / 2;

    return screenToFlowPosition({
      x: centerX,
      y: centerY,
    });
  }, [screenToFlowPosition]);
}
