'use client';

import { forwardRef, useState } from 'react';

import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface PlusButtonHandleProps {
  position: 'top' | 'right' | 'bottom' | 'left';
  onCreateNode: (position: 'top' | 'right' | 'bottom' | 'left') => void;
  className?: string;
}

const POSITION_STYLES = {
  top: 'left-1/2 -translate-x-1/2 -top-8',
  right: 'top-1/2 -translate-y-1/2 -right-8',
  bottom: 'left-1/2 -translate-x-1/2 -bottom-8',
  left: 'top-1/2 -translate-y-1/2 -left-8',
} as const;

const GHOST_POSITION_STYLES = {
  top: 'left-1/2 -translate-x-1/2 -top-[120px]',
  right: 'top-1/2 -translate-y-1/2 -right-[250px]',
  bottom: 'left-1/2 -translate-x-1/2 -bottom-[120px]',
  left: 'top-1/2 -translate-y-1/2 -left-[250px]',
} as const;

export const PlusButtonHandle = forwardRef<HTMLButtonElement, PlusButtonHandleProps>(
  ({ position, onCreateNode, className }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
      onCreateNode(position);
    };

    const getPositionLabel = (pos: 'top' | 'right' | 'bottom' | 'left') => {
      const labels = {
        top: '위쪽에 노드 추가',
        right: '오른쪽에 노드 추가',
        bottom: '아래쪽에 노드 추가',
        left: '왼쪽에 노드 추가',
      };
      return labels[pos];
    };

    return (
      <>
        {/* Plus Button */}
        <button
          ref={ref}
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            'absolute z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-blue-500 bg-white transition-all hover:scale-110 hover:bg-blue-50',
            POSITION_STYLES[position],
            className,
          )}
          aria-label={getPositionLabel(position)}
        >
          <Plus className="h-4 w-4 text-blue-500" />
        </button>

        {/* Ghost Node Preview */}
        {isHovered && (
          <div
            className={cn(
              'pointer-events-none absolute z-0 flex h-12 min-w-[200px] items-center justify-center rounded-lg border-2 border-dashed border-blue-400 bg-white px-5 py-2.5 opacity-50',
              GHOST_POSITION_STYLES[position],
            )}
          >
            <span className="truncate text-base font-medium text-gray-400">New Node</span>
          </div>
        )}
      </>
    );
  },
);

PlusButtonHandle.displayName = 'PlusButtonHandle';
