'use client';

import { memo } from 'react';

import { getSmoothStepPath, Position } from '@xyflow/react';

import { getNodeColors } from '@/features/roadmap-editor/constants/node-colors';
import { cn } from '@/lib/utils';

interface ConnectionLineProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromPosition?: Position;
  toPosition?: Position;
}

export const ConnectionLine = memo(function ConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition = Position.Bottom,
  toPosition = Position.Top,
}: ConnectionLineProps) {
  // Calculate distance between points
  const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const showGhost = distance > 50;

  // Get smooth step path
  const [edgePath] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  // Get ghost node colors (using white variant for preview)
  const colors = getNodeColors('white', 'default');

  return (
    <g>
      {/* Connection line */}
      <path fill="none" stroke="#b1b1b7" strokeWidth={2} className="animated" d={edgePath} />

      {/* Ghost node preview at endpoint */}
      {showGhost && (
        <foreignObject
          x={toX - 100}
          y={toY - 24}
          width={200}
          height={48}
          className="overflow-visible opacity-50"
        >
          <div
            className={cn(
              'flex h-12 min-w-[200px] items-center justify-center rounded-lg border-2 px-5 py-2.5',
              colors.bg,
              colors.border,
              colors.text,
            )}
          >
            <span className="truncate text-base font-medium">New Node</span>
          </div>
        </foreignObject>
      )}
    </g>
  );
});
