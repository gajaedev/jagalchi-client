import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EDITOR_MESSAGES } from '@/constants/messages';
import type { AIAction } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface AIMenuProps {
  onActionSelect: (action: AIAction) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * AI action dropdown menu
 * Provides "로드맵 생성" and "로드맵 수정" options
 */
export function AIMenu({
  onActionSelect,
  isOpen,
  onOpenChange,
  disabled = false,
  className,
}: AIMenuProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          className={cn('h-8 w-8', className)}
          aria-label={EDITOR_MESSAGES.AI_MENU_LABEL}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => onActionSelect('generate')}>
          <Sparkles className="mr-2 h-4 w-4" />
          {EDITOR_MESSAGES.AI_GENERATE_ROADMAP}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onActionSelect('modify')}>
          <Sparkles className="mr-2 h-4 w-4" />
          {EDITOR_MESSAGES.AI_MODIFY_ROADMAP}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
