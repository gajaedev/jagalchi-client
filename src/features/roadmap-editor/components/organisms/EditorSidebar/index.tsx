'use client';

import { memo, useState } from 'react';

import { useAtomValue } from 'jotai';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import {
  selectionTypeAtom,
  singleSelectedNodeAtom,
  singleSelectedEdgeAtom,
} from '../../../stores/editor-atoms';
import { EdgePropertiesPanel } from '../EdgePropertiesPanel';
import { MultiSelectPanel } from '../MultiSelectPanel';
import { NodePropertiesPanel } from '../NodePropertiesPanel';
import { SectionPropertiesPanel } from '../SectionPropertiesPanel';
import { TextPropertiesPanel } from '../TextPropertiesPanel';

import type {
  JagalchiNodeType,
  JagalchiSectionType,
  JagalchiTextType,
} from '../../../types/editor.types';

/**
 * EditorSidebar - 에디터 우측 사이드바
 *
 * Figma 디자인 (4472:1569) 기반 구조:
 * - 접기/펼치기 토글 버튼 (왼쪽 상단에 삐죽 튀어나옴)
 * - 펼쳐진 상태: 240px, 닫힌 상태: 16px
 * - 선택된 요소에 따라 다른 Properties Panel 표시
 */
export const EditorSidebar = memo(function EditorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const selectionType = useAtomValue(selectionTypeAtom);
  const selectedNode = useAtomValue(singleSelectedNodeAtom);
  const selectedEdge = useAtomValue(singleSelectedEdgeAtom);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Render appropriate panel based on selection type
  const renderPanel = () => {
    // Collapsed 상태면 패널 표시 안 함
    if (isCollapsed) return null;

    // No selection - render empty state
    if (!selectionType) {
      return (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground text-sm">{EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}</p>
        </div>
      );
    }

    switch (selectionType) {
      case 'node':
        return <NodePropertiesPanel node={selectedNode as JagalchiNodeType} />;
      case 'edge':
        return <EdgePropertiesPanel edge={selectedEdge!} />;
      case 'section':
        return <SectionPropertiesPanel node={selectedNode as JagalchiSectionType} />;
      case 'text':
        return <TextPropertiesPanel node={selectedNode as JagalchiTextType} />;
      case 'multi':
        return <MultiSelectPanel />;
      default:
        return (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground text-sm">{EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}</p>
          </div>
        );
    }
  };

  return (
    <aside
      className={`relative border-l border-slate-200 bg-white transition-all duration-300 ${
        isCollapsed ? 'w-4' : 'w-60'
      }`}
    >
      {/* 토글 버튼 - 왼쪽 상단에 삐죽 튀어나옴 */}
      <button
        type="button"
        onClick={toggleCollapse}
        className="absolute top-0 left-0 flex size-8 -translate-x-full items-center justify-center rounded-bl-lg border-b border-l border-slate-200 bg-white p-2.5 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
        aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
      >
        {isCollapsed ? (
          <ChevronsLeft className="size-4 text-slate-600" />
        ) : (
          <ChevronsRight className="size-4 text-slate-600" />
        )}
      </button>

      {/* 패널 콘텐츠 */}
      {renderPanel()}
    </aside>
  );
});
