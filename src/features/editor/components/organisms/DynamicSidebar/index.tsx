'use client';

import { useAtomValue } from 'jotai';

import {
  selectionTypeAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
} from '../../../stores/editor-atoms';
import { LineSidebar } from '../LineSidebar';
import { MultiSelectionSidebar } from '../MultiSelectionSidebar';
import { NodeSidebar } from '../NodeSidebar';

export function DynamicSidebar() {
  const selectionType = useAtomValue(selectionTypeAtom);
  const selectedNodeIds = useAtomValue(selectedNodeIdsAtom);
  const selectedEdgeIds = useAtomValue(selectedEdgeIdsAtom);

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
      return (
        <MultiSelectionSidebar
          selectedCount={selectedNodeIds.length + selectedEdgeIds.length}
          onAlign={(type) => {
            // TODO: React Flow nodes alignment 로직
            // eslint-disable-next-line no-console
            console.log('Align:', type);
          }}
          onSpacingChange={(spacing) => {
            // TODO: Node spacing 조정 로직
            // eslint-disable-next-line no-console
            console.log('Spacing:', spacing);
          }}
        />
      );

    // 'section'과 'text' case는 selectionTypeAtom이 반환하지 않음 (unreachable)
    // TODO: selectionTypeAtom을 확장하여 노드 타입을 구분하도록 개선
    default:
      return null;
  }
}
