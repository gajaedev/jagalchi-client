'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ToolbarDropdownItem } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface ToolbarDropdownProps {
  trigger: React.ReactNode;
  items: ToolbarDropdownItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function ToolbarDropdown({
  trigger,
  items,
  open,
  onOpenChange,
  className,
}: ToolbarDropdownProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn('min-w-[200px]', className)}>
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className="flex items-center gap-2"
          >
            <span className="size-4">{item.icon}</span>
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ToolbarDropdown;
