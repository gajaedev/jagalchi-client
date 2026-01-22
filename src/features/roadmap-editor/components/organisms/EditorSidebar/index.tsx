'use client';

import { memo } from 'react';

import { useAtomValue } from 'jotai';

import { EDITOR_MESSAGES } from '@/constants/messages';

import {
  singleSelectedNodeAtom,
  singleSelectedEdgeAtom,
  selectedNodeIdsAtom,
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

export const EditorSidebar = memo(function EditorSidebar() {
  const selectedNode = useAtomValue(singleSelectedNodeAtom);
  const selectedEdge = useAtomValue(singleSelectedEdgeAtom);
  const selectedNodeIds = useAtomValue(selectedNodeIdsAtom);

  // Multi-select (2개 이상 노드 선택)
  if (selectedNodeIds.length >= 2) {
    return (
      <aside className="bg-muted/30 w-60 border-l">
        <MultiSelectPanel />
      </aside>
    );
  }

  // Edge가 선택된 경우
  if (selectedEdge) {
    return (
      <aside className="bg-muted/30 w-60 border-l">
        <EdgePropertiesPanel edge={selectedEdge} />
      </aside>
    );
  }

  // Node가 선택된 경우
  if (selectedNode) {
    if (selectedNode.type === 'jagalchi-node') {
      return (
        <aside className="bg-muted/30 w-60 border-l">
          <NodePropertiesPanel node={selectedNode as JagalchiNodeType} />
        </aside>
      );
    }

    if (selectedNode.type === 'jagalchi-section') {
      return (
        <aside className="bg-muted/30 w-60 border-l">
          <SectionPropertiesPanel node={selectedNode as JagalchiSectionType} />
        </aside>
      );
    }

    if (selectedNode.type === 'jagalchi-text') {
      return (
        <aside className="bg-muted/30 w-60 border-l">
          <TextPropertiesPanel node={selectedNode as JagalchiTextType} />
        </aside>
      );
    }
  }

  // 아무것도 선택되지 않은 경우
  return (
    <aside className="bg-muted/30 flex w-60 items-center justify-center border-l">
      <p className="text-muted-foreground text-sm">{EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}</p>
    </aside>
  );
});
