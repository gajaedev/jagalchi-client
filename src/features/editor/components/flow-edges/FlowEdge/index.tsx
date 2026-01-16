import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';

import type { LineData } from '@/features/editor/types/editor.types';

import type { EdgeProps } from '@xyflow/react';

/**
 * Custom edge component for React Flow
 * Supports solid, dashed, dotted line styles with custom colors and optional labels
 */
export function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const lineData = data as LineData | undefined;
  const strokeDasharray = getStrokeDasharray(lineData?.style || 'solid');
  const color = lineData?.color || '#000000';
  const label = lineData?.label;

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: color, strokeDasharray }} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="bg-background border-border rounded border px-2 py-1 text-xs font-medium shadow-sm"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

/**
 * Convert line style to SVG stroke-dasharray value
 */
function getStrokeDasharray(style: 'solid' | 'dashed' | 'dotted'): string {
  switch (style) {
    case 'dashed':
      return '5,5';
    case 'dotted':
      return '1,3';
    case 'solid':
    default:
      return '0';
  }
}
