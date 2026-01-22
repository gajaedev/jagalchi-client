'use client';

import { memo, useCallback } from 'react';

import { Handle, Position, useReactFlow } from '@xyflow/react';
import { useSetAtom } from 'jotai';

import { PlusButtonHandle } from '@/features/roadmap-editor/components/atoms';
import { getNodeColors } from '@/features/roadmap-editor/constants/node-colors';
import { nodesAtom } from '@/features/roadmap-editor/stores/editor-atoms';
import type { JagalchiNodeData } from '@/features/roadmap-editor/types/editor.types';
import { createJagalchiNode } from '@/features/roadmap-editor/utils/node-factory';
import { cn } from '@/lib/utils';

interface JagalchiNodeProps {
  data: JagalchiNodeData;
  selected?: boolean;
  id: string;
}

const POSITION_OFFSET = 100;

export const JagalchiNode = memo(function JagalchiNode({ data, selected, id }: JagalchiNodeProps) {
  const state = selected ? 'focus' : 'default';
  const colors = getNodeColors(data.variant, state);
  const setNodes = useSetAtom(nodesAtom);
  const { getNode } = useReactFlow();

  const handleCreateNode = useCallback(
    (position: 'top' | 'right' | 'bottom' | 'left') => {
      const currentNode = getNode(id);
      if (!currentNode) return;

      const offsets = {
        top: { x: 0, y: -POSITION_OFFSET },
        right: { x: POSITION_OFFSET, y: 0 },
        bottom: { x: 0, y: POSITION_OFFSET },
        left: { x: -POSITION_OFFSET, y: 0 },
      };

      const offset = offsets[position];
      const newNode = createJagalchiNode({
        position: {
          x: currentNode.position.x + offset.x,
          y: currentNode.position.y + offset.y,
        },
        variant: data.variant,
      });

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [id, data.variant, getNode, setNodes],
  );

  return (
    <div
      className={cn(
        'relative flex h-12 min-w-[200px] items-center justify-center rounded-lg border-2 px-5 py-2.5 transition-colors',
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

      {/* Plus Button Handles (only when selected) */}
      {selected && (
        <>
          <PlusButtonHandle position="top" onCreateNode={handleCreateNode} />
          <PlusButtonHandle position="right" onCreateNode={handleCreateNode} />
          <PlusButtonHandle position="bottom" onCreateNode={handleCreateNode} />
          <PlusButtonHandle position="left" onCreateNode={handleCreateNode} />
        </>
      )}
    </div>
  );
});
