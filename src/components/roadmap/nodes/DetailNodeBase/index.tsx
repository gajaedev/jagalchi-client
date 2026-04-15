'use client';

import { memo } from 'react';

import { Handle, Position } from '@xyflow/react';

import { getNodeColors } from '@/components/roadmap/constants/node-colors';
import { cn } from '@/lib/utils';
import type { JagalchiNodeData } from '@/types/roadmap.types';

interface DetailNodeBaseProps {
  data: JagalchiNodeData;
  selected?: boolean;
  children?: React.ReactNode;
}

export const DetailNodeBase = memo(function DetailNodeBase({
  data,
  selected,
  children,
}: DetailNodeBaseProps) {
  const state = selected ? 'focus' : 'default';
  const colors = getNodeColors(data.variant, state);

  return (
    <div
      className={cn(
        'relative flex min-w-[200px] flex-col gap-1 rounded-lg border-2 px-5 py-3 transition-colors',
        colors.bg,
        colors.border,
        colors.text,
      )}
    >
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-[4px] !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-[4px] !border-2', colors.handle)}
      />

      <span className="truncate text-base font-bold">{data.label}</span>
      {data.description && (
        <span className="line-clamp-2 text-sm opacity-70">{data.description}</span>
      )}

      {children}
    </div>
  );
});
