import { Handle, Position } from '@xyflow/react';

import type { FlowNodeData } from '@/features/editor/types/editor.types';
import { getFlowNodeClasses } from '@/features/editor/utils';
import { cn } from '@/lib/utils';

import { BaseFlowNode } from '../BaseFlowNode';

interface FlowNodeProps {
  data: FlowNodeData;
  selected?: boolean;
}

/**
 * React Flow custom node component with 4 connection handles
 * Displays "Node_N" title where N is the node index
 */
export function FlowNode({ data, selected }: FlowNodeProps) {
  const { variant, state, index = 1 } = data;
  const nodeState = selected ? 'focus' : state;
  const colors = getFlowNodeClasses(variant, nodeState);

  return (
    <BaseFlowNode
      variant={variant}
      state={nodeState}
      className="relative h-[60px] w-[120px] px-5 py-2.5"
    >
      {/* Connection Handles */}
      <Handle
        type="source"
        position={Position.Top}
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Left}
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={cn('!border-background !h-1.5 !w-1.5 !rounded-full !border-2', colors.handle)}
      />

      {/* Node Title */}
      <div className="flex flex-col justify-center text-base leading-6 font-medium whitespace-nowrap">
        Node_{index}
      </div>
    </BaseFlowNode>
  );
}
