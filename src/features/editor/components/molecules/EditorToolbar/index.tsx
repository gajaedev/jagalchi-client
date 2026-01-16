'use client';

import { Box, Minus, Square, Type, Settings, Sparkles } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ToolbarItem } from '@/features/editor/components/atoms/ToolbarItem';
import type { EditorToolbarMode } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  activeMode?: EditorToolbarMode | null;
  onModeChange?: (mode: EditorToolbarMode) => void;
  onAIAction?: (action: 'generate' | 'modify') => void;
  className?: string;
}

export function EditorToolbar({
  activeMode,
  onModeChange,
  onAIAction,
  className,
}: EditorToolbarProps) {
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

      {/* AI Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="hover:bg-accent hover:text-accent-foreground flex h-10 w-10 items-center justify-center rounded-md transition-colors"
            aria-label="AI 기능"
          >
            <Settings className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onAIAction?.('generate')}>
            <Sparkles className="mr-2 h-4 w-4" />
            로드맵 생성
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onAIAction?.('modify')}>
            <Sparkles className="mr-2 h-4 w-4" />
            로드맵 수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
