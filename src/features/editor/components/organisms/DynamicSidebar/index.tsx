'use client';

import { useAtomValue } from 'jotai';

import { selectionTypeAtom } from '../../../stores/editor-atoms';
import { LineSidebar } from '../LineSidebar';
import { NodeSidebar } from '../NodeSidebar';
import { SectionSidebar } from '../SectionSidebar';
import { TextSidebar } from '../TextSidebar';

export function DynamicSidebar() {
  const selectionType = useAtomValue(selectionTypeAtom);

  // 선택 없으면 렌더링 안 함
  if (!selectionType) {
    return null;
  }

  switch (selectionType) {
    case 'node':
      return <NodeSidebar />;

    case 'line':
      return <LineSidebar />;

    case 'section':
      return <SectionSidebar />;

    case 'text':
      return <TextSidebar />;

    case 'mixed':
      return <div className="text-muted-foreground p-4 text-sm">여러 요소가 선택되었습니다.</div>;

    default:
      return null;
  }
}
