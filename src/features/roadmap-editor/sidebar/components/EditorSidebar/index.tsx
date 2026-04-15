'use client';

import { memo, useState } from 'react';

import { useAtomValue } from 'jotai';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import {
  EdgePropertiesPanel,
  NodePropertiesPanel,
  SectionPropertiesPanel,
  TextPropertiesPanel,
} from '../../../properties/components';
import {
  singleSelectedNodeAtom,
  singleSelectedEdgeAtom,
  selectedNodeIdsAtom,
} from '../../../stores/editor-atoms';
import { MultiSelectPanel } from '../MultiSelectPanel';

import type {
  JagalchiNodeType,
  JagalchiSectionType,
  JagalchiTextType,
} from '../../../types/editor.types';

export const EditorSidebar = memo(function EditorSidebar() {
  const selectedNode = useAtomValue(singleSelectedNodeAtom);
  const selectedEdge = useAtomValue(singleSelectedEdgeAtom);
  const selectedNodeIds = useAtomValue(selectedNodeIdsAtom);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapseButton = (
    <button
      className="absolute top-2 -left-8 z-10 flex h-8 w-8 items-center justify-center rounded-l-lg border border-r-0 border-slate-200 bg-white shadow-sm"
      onClick={() => setIsCollapsed((prev) => !prev)}
      aria-label={
        isCollapsed ? EDITOR_MESSAGES.SIDEBAR_OPEN_ARIA : EDITOR_MESSAGES.SIDEBAR_CLOSE_ARIA
      }
    >
      {isCollapsed ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
    </button>
  );

  if (isCollapsed) {
    return <div className="relative h-full w-0">{collapseButton}</div>;
  }

  // Multi-select (2개 이상 노드 선택)
  if (selectedNodeIds.length >= 2) {
    return (
      <aside className="relative h-full w-[240px] border-l bg-white shadow-md">
        {collapseButton}
        <MultiSelectPanel />
      </aside>
    );
  }

  // Edge가 선택된 경우
  if (selectedEdge) {
    return (
      <aside className="relative h-full w-[240px] border-l bg-white shadow-md">
        {collapseButton}
        <EdgePropertiesPanel edge={selectedEdge} />
      </aside>
    );
  }

  // Node가 선택된 경우
  if (selectedNode) {
    if (selectedNode.type === 'jagalchi-node') {
      return (
        <aside className="relative h-full w-[240px] border-l bg-white shadow-md">
          {collapseButton}
          <NodePropertiesPanel node={selectedNode as JagalchiNodeType} />
        </aside>
      );
    }

    if (selectedNode.type === 'jagalchi-section') {
      return (
        <aside className="relative h-full w-[240px] border-l bg-white shadow-md">
          {collapseButton}
          <SectionPropertiesPanel node={selectedNode as JagalchiSectionType} />
        </aside>
      );
    }

    if (selectedNode.type === 'jagalchi-text') {
      return (
        <aside className="relative h-full w-[240px] border-l bg-white shadow-md">
          {collapseButton}
          <TextPropertiesPanel node={selectedNode as JagalchiTextType} />
        </aside>
      );
    }
  }

  // 아무것도 선택되지 않은 경우
  return (
    <aside className="relative flex h-full w-[240px] items-center justify-center border-l bg-white">
      <div className="absolute top-0 left-0">{collapseButton}</div>
      <p className="text-muted-foreground text-sm" data-testid="sidebar-empty-state">
        {EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}
      </p>
    </aside>
  );
});
