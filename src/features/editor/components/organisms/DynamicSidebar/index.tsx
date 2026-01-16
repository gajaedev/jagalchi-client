'use client';

import { useAtomValue } from 'jotai';

import { selectionTypeAtom } from '../../../stores/editor-atoms';
import { LineSidebar } from '../LineSidebar';
import { NodeSidebar } from '../NodeSidebar';

export function DynamicSidebar() {
  const selectionType = useAtomValue(selectionTypeAtom);

  // 선택 없으면 렌더링 안 함
  if (!selectionType) {
    return null;
  }

  switch (selectionType) {
    case 'node':
      // TODO: React Flow 노드 타입에 따라 NodeSidebar/SectionSidebar/TextSidebar 구분
      // 현재는 모든 노드에 NodeSidebar 사용
      return <NodeSidebar />;

    case 'line':
      return <LineSidebar />;

    case 'mixed':
      return <div className="text-muted-foreground p-4 text-sm">여러 요소가 선택되었습니다.</div>;

    // 'section'과 'text' case는 selectionTypeAtom이 반환하지 않음 (unreachable)
    // TODO: selectionTypeAtom을 확장하여 노드 타입을 구분하도록 개선
    default:
      return null;
  }
}
