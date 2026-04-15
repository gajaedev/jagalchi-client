'use client';

import { memo, useCallback, useRef } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { SquarePlus, Spline, Frame, Type } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { EditorAiMenu } from '../../../components/molecules/EditorAiMenu';
import { useCanvasCenter } from '../../../hooks/use-canvas-center';
import { activeToolAtom, nodesAtom } from '../../../stores/editor-atoms';
import {
  createJagalchiNode,
  createJagalchiSection,
  createJagalchiText,
} from '../../../utils/node-factory';
import { ToolbarButton } from '../ToolbarButton';

export const EditorToolbar = memo(function EditorToolbar() {
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const setNodes = useSetAtom(nodesAtom);
  const getCanvasCenter = useCanvasCenter();

  const handleNodeAdd = useCallback(() => {
    const position = getCanvasCenter();
    const newNode = createJagalchiNode({ position });
    setNodes((prev) => [...prev, newNode]);
    setActiveTool('select');
  }, [getCanvasCenter, setNodes, setActiveTool]);

  const handleSectionAdd = useCallback(() => {
    const position = getCanvasCenter();
    const newSection = createJagalchiSection({ position });
    setNodes((prev) => [...prev, newSection]);
    setActiveTool('select');
  }, [getCanvasCenter, setNodes, setActiveTool]);

  const handleTextAdd = useCallback(() => {
    const position = getCanvasCenter();
    const newText = createJagalchiText({ position });
    setNodes((prev) => [...prev, newText]);
    setActiveTool('select');
  }, [getCanvasCenter, setNodes, setActiveTool]);

  const handleLineAdd = useCallback(() => {
    setActiveTool('line');
  }, [setActiveTool]);

  const toolbarRef = useRef<HTMLDivElement>(null);

  const handleToolbarKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const buttons = toolbarRef.current?.querySelectorAll<HTMLButtonElement>('button');
    if (!buttons?.length) return;
    const idx = Array.from(buttons).indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight'
        ? (idx + 1) % buttons.length
        : (idx - 1 + buttons.length) % buttons.length;
    buttons[next].focus();
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label="에디터 도구 모음"
        onKeyDown={handleToolbarKeyDown}
        className="bg-background flex items-center gap-2 rounded-lg border p-2 shadow-md"
      >
        <ToolbarButton
          icon={<SquarePlus className="h-[15px] w-[15px]" />}
          label={EDITOR_MESSAGES.TOOLBAR_NODE_TOOLTIP}
          isActive={activeTool === 'node'}
          onClick={handleNodeAdd}
          testId="toolbar-add-node"
        />
        <ToolbarButton
          icon={<Spline className="h-[15px] w-[15px]" />}
          label={EDITOR_MESSAGES.TOOLBAR_LINE_TOOLTIP}
          isActive={activeTool === 'line'}
          onClick={handleLineAdd}
          testId="toolbar-add-line"
        />
        <ToolbarButton
          icon={<Frame className="h-[15px] w-[15px]" />}
          label={EDITOR_MESSAGES.TOOLBAR_SECTION_TOOLTIP}
          isActive={activeTool === 'section'}
          onClick={handleSectionAdd}
          testId="toolbar-add-section"
        />
        <ToolbarButton
          icon={<Type className="h-[15px] w-[15px]" />}
          label={EDITOR_MESSAGES.TOOLBAR_TEXT_TOOLTIP}
          isActive={activeTool === 'text'}
          onClick={handleTextAdd}
          testId="toolbar-add-text"
        />

        <div className="bg-border mx-1 h-8 w-px" />

        <EditorAiMenu />
      </div>
    </div>
  );
});
