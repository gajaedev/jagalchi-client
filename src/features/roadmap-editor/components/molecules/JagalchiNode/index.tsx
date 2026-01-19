'use client';

import { memo } from 'react';

import { Handle, Position } from '@xyflow/react';

import { getNodeColors } from '@/features/roadmap-editor/constants/node-colors';
import type { JagalchiNodeData } from '@/features/roadmap-editor/types/editor.types';
import { cn } from '@/lib/utils';

interface JagalchiNodeProps {
  data: JagalchiNodeData;
  selected?: boolean;
}

export const JagalchiNode = memo(function JagalchiNode({ data, selected }: JagalchiNodeProps) {
  const state = selected ? 'focus' : 'default';
  const colors = getNodeColors(data.variant, state);

  return (
    <div
      className={cn(
        'flex h-12 min-w-[200px] items-center justify-center rounded-lg border-2 px-5 py-2.5 transition-colors',
        colors.bg,
        colors.border,
        colors.text,
      )}
    >
      {/* 4개 연결점 (상하좌우) */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />

      <span className="truncate text-base font-medium">{data.label}</span>
    </div>
  );
});
