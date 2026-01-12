'use client';

import { Box, Minus, Square, Type, Sparkles } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { ToolbarItem } from '@/features/editor/components/atoms/ToolbarItem';
import type { EditorToolbarMode } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  activeMode?: EditorToolbarMode | null;
  onModeChange?: (mode: EditorToolbarMode) => void;
  className?: string;
}

export function EditorToolbar({ activeMode, onModeChange, className }: EditorToolbarProps) {
  return (
    <div
      className={cn('bg-card flex items-center gap-2 border p-2 shadow-md', className)}
      role="toolbar"
      aria-label="에디터 도구"
    >
      <ToolbarItem
        icon={<Box />}
        label="노드"
        active={activeMode === 'node'}
        onClick={() => onModeChange?.('node')}
      />

      <ToolbarItem
        icon={<Minus />}
        label="선"
        active={activeMode === 'line'}
        onClick={() => onModeChange?.('line')}
      />

      <ToolbarItem
        icon={<Square />}
        label="섹션"
        active={activeMode === 'section'}
        onClick={() => onModeChange?.('section')}
      />

      <ToolbarItem
        icon={<Type />}
        label="텍스트"
        active={activeMode === 'text'}
        onClick={() => onModeChange?.('text')}
      />

      <Separator orientation="vertical" className="h-8" />

      <ToolbarItem
        icon={<Sparkles />}
        label="AI"
        active={activeMode === 'ai'}
        onClick={() => onModeChange?.('ai')}
      />
    </div>
  );
}

export default EditorToolbar;
