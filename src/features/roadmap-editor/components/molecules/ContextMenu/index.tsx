'use client';

import { ReactNode } from 'react';

import {
  ContextMenu as UIContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

export interface ContextMenuProps {
  children: ReactNode;
  onCopy?: () => void;
  onPaste?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

/**
 * 에디터 노드/엣지 우클릭 시 나타나는 컨텍스트 메뉴 컴포넌트
 */
export function ContextMenu({
  children,
  onCopy,
  onPaste,
  onDuplicate,
  onDelete,
  disabled = false,
}: ContextMenuProps) {
  return (
    <UIContextMenu>
      <ContextMenuTrigger asChild disabled={disabled}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48" alignOffset={5}>
        <ContextMenuItem onClick={onCopy} disabled={!onCopy} className="cursor-pointer">
          복사 (Copy)
        </ContextMenuItem>
        <ContextMenuItem onClick={onPaste} disabled={!onPaste} className="cursor-pointer">
          붙여넣기 (Paste)
        </ContextMenuItem>
        <ContextMenuItem onClick={onDuplicate} disabled={!onDuplicate} className="cursor-pointer">
          복제 (Duplicate)
        </ContextMenuItem>
        <ContextMenuItem
          onClick={onDelete}
          disabled={!onDelete}
          className="cursor-pointer"
          variant="destructive"
        >
          삭제 (Delete)
        </ContextMenuItem>
      </ContextMenuContent>
    </UIContextMenu>
  );
}
