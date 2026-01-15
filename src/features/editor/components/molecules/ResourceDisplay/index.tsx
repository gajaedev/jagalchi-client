import { ArrowUpRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Resource } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface ResourceDisplayProps {
  resource: Resource;
  onDelete?: (id: string) => void;
  showIcon?: boolean;
  className?: string;
}

/**
 * Resource link display component
 * Shows a clickable resource link with optional icon and delete button
 * Read-only display (different from ResourceInput which is for editing)
 */
export function ResourceDisplay({
  resource,
  onDelete,
  showIcon = true,
  className,
}: ResourceDisplayProps) {
  return (
    <div
      className={cn(
        'bg-background flex h-9 items-center justify-between gap-2 rounded-lg border px-2',
        className,
      )}
    >
      {/* Link + Icon */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground flex flex-1 items-center gap-2 overflow-hidden text-sm font-medium transition-colors hover:underline"
      >
        <span className="truncate">{resource.url}</span>
        {showIcon && <ArrowUpRight className="h-3 w-3 flex-shrink-0" />}
      </a>

      {/* Delete Button */}
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={() => onDelete(resource.id)}
          aria-label="자료 삭제"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}
