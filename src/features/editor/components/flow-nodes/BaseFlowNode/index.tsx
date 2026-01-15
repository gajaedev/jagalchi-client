import type { NodeColorVariant, NodeState } from '@/features/editor/types/editor.types';
import { getFlowNodeClasses } from '@/features/editor/utils';
import { cn } from '@/lib/utils';

interface BaseFlowNodeProps {
  variant: NodeColorVariant;
  state: NodeState;
  children: React.ReactNode;
  className?: string;
}

/**
 * Base component for React Flow custom nodes
 * Provides common styling based on color variant and state
 * Internal use only - not exported from barrel files
 */
export function BaseFlowNode({ variant, state, children, className }: BaseFlowNodeProps) {
  const colors = getFlowNodeClasses(variant, state);

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg border-2 transition-colors',
        colors.bg,
        colors.border,
        colors.text,
        className,
      )}
    >
      {children}
    </div>
  );
}
