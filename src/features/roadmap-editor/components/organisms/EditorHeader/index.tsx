'use client';

import { cn } from '@/lib/utils';

interface EditorHeaderProps {
  className?: string;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  zoomLevel?: number;
}

export function EditorHeader({
  className,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  zoomLevel = 100,
}: EditorHeaderProps) {
  return (
    <header
      className={cn(
        'bg-neutral-0 flex h-[60px] items-center justify-between border-b border-neutral-200 px-4',
        className,
      )}
    >
      {/* Logo Section */}
      <div className="flex h-12 w-12 items-center justify-center">
        <span className="text-primary-500 text-xl font-bold">J</span>
      </div>

      {/* Zoom Controls Section */}
      <div className="flex items-center gap-4">
        {/* Zoom Buttons with 16px gap */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onZoomOut}
            className="focus:ring-primary-500 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            onClick={onZoomReset}
            className="focus:ring-primary-500 min-w-[60px] rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Reset zoom"
          >
            {zoomLevel}%
          </button>
          <button
            type="button"
            onClick={onZoomIn}
            className="focus:ring-primary-500 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>

        {/* Right spacing: 24px from edge is handled by parent padding */}
      </div>
    </header>
  );
}
