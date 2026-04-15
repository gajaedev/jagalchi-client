import React from 'react';

import Image from 'next/image';

import { Ellipsis, SquareDashed } from 'lucide-react';

import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MY_ROADMAPS_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

interface RoadmapCardProps {
  id?: number;
  title: string;
  type?: 'Roadmap' | 'Directory';
  author?: string;
  fileCount?: number;
  imageUrl?: string;
  isFavorite?: boolean;
  className?: string;
  onClick?: () => void;
  onFavorite?: () => void;
  onRename?: () => void;
  onMove?: () => void;
  onDelete?: () => void;
}

export function RoadmapCard({
  title,
  type = 'Roadmap',
  author,
  fileCount,
  imageUrl,
  isFavorite: _isFavorite,
  className,
  onClick,
  onFavorite,
  onRename,
  onMove,
  onDelete,
}: RoadmapCardProps) {
  const isDirectory = type === 'Directory';

  return (
    <Card
      role="article"
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'group relative flex h-[200px] w-[304px] cursor-pointer flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 p-0 shadow-none transition-all',
        'focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      onClick={onClick}
    >
      {/* Thumbnail Area */}
      <div className="relative flex-1 bg-slate-100">
        {isDirectory ? (
          <div className="relative h-full w-full">
            <div className="absolute top-0 left-0 h-4 w-24 rounded-t-lg bg-white" />
            <div className="absolute inset-0 top-4 flex items-center justify-center rounded-tr-lg bg-white">
              <SquareDashed className="text-muted-foreground/30 h-8 w-8" />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            {imageUrl ? (
              <Image src={imageUrl} alt={title} fill className="object-cover" sizes="304px" />
            ) : (
              <SquareDashed className="text-muted-foreground/30 h-8 w-8" />
            )}
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="flex items-center bg-white px-3 py-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-sm leading-[21px] text-slate-950">{title}</p>
          <p className="truncate text-xs leading-4 text-slate-500">
            {isDirectory
              ? `${fileCount ?? 0}${MY_ROADMAPS_MESSAGES.CARD_FILE_COUNT_SUFFIX}`
              : `By ${author ?? '홍길동'}`}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={MY_ROADMAPS_MESSAGES.CARD_MORE_ARIA}
              className="text-muted-foreground/60 hover:text-foreground shrink-0 p-1 transition-colors"
            >
              <Ellipsis className="h-[13px] w-[13px]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[72px] p-[10px]">
            {!isDirectory && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer justify-center text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite?.();
                  }}
                >
                  {MY_ROADMAPS_MESSAGES.CARD_FAVORITE}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              className="cursor-pointer justify-center text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onRename?.();
              }}
            >
              {MY_ROADMAPS_MESSAGES.CARD_RENAME}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer justify-center text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onMove?.();
              }}
            >
              {MY_ROADMAPS_MESSAGES.CARD_MOVE}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer justify-center text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              {MY_ROADMAPS_MESSAGES.CARD_DELETE}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
