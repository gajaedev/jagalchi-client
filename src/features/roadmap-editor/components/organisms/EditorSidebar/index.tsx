'use client';

import { memo } from 'react';

import { useAtomValue } from 'jotai';

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

export const EditorSidebar = memo(function EditorSidebar() {
  const selectionType = useAtomValue(selectionTypeAtom);
  const selectedNode = useAtomValue(singleSelectedNodeAtom);
  const selectedEdge = useAtomValue(singleSelectedEdgeAtom);

  // No selection - render empty state
  if (!selectionType) {
    return (
      <aside className="flex w-60 items-center justify-center border-l border-slate-200 bg-white">
        <p className="text-muted-foreground text-sm">{EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}</p>
      </aside>
    );
  }

  // Render appropriate panel based on selection type
  const renderPanel = () => {
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
          <p className="text-muted-foreground text-sm">{EDITOR_MESSAGES.SIDEBAR_EMPTY_STATE}</p>
        );
    }
  };

  return <aside className="w-60 border-l border-slate-200 bg-white">{renderPanel()}</aside>;
});
