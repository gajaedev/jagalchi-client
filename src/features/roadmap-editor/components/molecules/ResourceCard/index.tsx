'use client';

import { ExternalLink, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ResourceCardProps {
  title: string;
  url: string;
  onAdd?: () => void;
  className?: string;
}

export function ResourceCard({ title, url, onAdd, className }: ResourceCardProps) {
  return (
    <div
      className={cn(
        'bg-neutral-0 flex items-center justify-between gap-3 rounded-md border border-neutral-200 p-3',
        className,
      )}
    >
      {/* Resource Info */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ExternalLink className="h-4 w-4 shrink-0 text-neutral-700" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-neutral-900">{title}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600 truncate text-xs transition-colors"
          >
            {url}
          </a>
        </div>
      </div>

      {/* Add Button */}
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="focus:ring-primary-500 bg-primary-500 text-neutral-0 hover:bg-primary-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors focus:ring-2 focus:outline-none"
          aria-label={`Add ${title}`}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
