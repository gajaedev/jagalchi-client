'use client';

import { memo } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Square, Minus, RectangleHorizontal, Type, Settings } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { useCanvasCenter } from '../../../hooks/use-canvas-center';
import { activeToolAtom, nodesAtom } from '../../../stores/editor-atoms';
import {
  createJagalchiNode,
  createJagalchiSection,
  createJagalchiText,
} from '../../../utils/node-factory';
import { ToolbarButton } from '../../atoms/ToolbarButton';

export const EditorToolbar = memo(function EditorToolbar() {
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);
  const setNodes = useSetAtom(nodesAtom);
  const getCanvasCenter = useCanvasCenter();

  const handleNodeAdd = () => {
    const position = getCanvasCenter();
    const newNode = createJagalchiNode({ position });
    setNodes((prev) => [...prev, newNode]);
    setActiveTool('select');
  };

  const handleSectionAdd = () => {
    const position = getCanvasCenter();
    const newSection = createJagalchiSection({ position });
    setNodes((prev) => [...prev, newSection]);
    setActiveTool('select');
  };

  const handleTextAdd = () => {
    const position = getCanvasCenter();
    const newText = createJagalchiText({ position });
    setNodes((prev) => [...prev, newText]);
    setActiveTool('select');
  };

  const handleLineAdd = () => {
    // Phase 2: Line tool은 나중에 구현 (엣지는 Handle에서 드래그로 생성)
    setActiveTool('line');
  };

  const handleGearClick = () => {
    // Phase 3: AI 기능 드롭다운
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
      <div className="bg-background flex items-center gap-2 rounded-lg border p-2 shadow-lg">
        <ToolbarButton
          icon={<Square className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_NODE_TOOLTIP}
          isActive={activeTool === 'node'}
          onClick={handleNodeAdd}
        />
        <ToolbarButton
          icon={<Minus className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_LINE_TOOLTIP}
          isActive={activeTool === 'line'}
          onClick={handleLineAdd}
        />
        <ToolbarButton
          icon={<RectangleHorizontal className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_SECTION_TOOLTIP}
          isActive={activeTool === 'section'}
          onClick={handleSectionAdd}
        />
        <ToolbarButton
          icon={<Type className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_TEXT_TOOLTIP}
          isActive={activeTool === 'text'}
          onClick={handleTextAdd}
        />

        <div className="bg-border mx-1 h-6 w-px" />

        <ToolbarButton
          icon={<Settings className="h-5 w-5" />}
          label={EDITOR_MESSAGES.TOOLBAR_GEAR_TOOLTIP}
          isActive={false}
          onClick={handleGearClick}
        />
      </div>
    </div>
  );
});
