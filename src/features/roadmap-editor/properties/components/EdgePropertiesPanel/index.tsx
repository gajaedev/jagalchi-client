'use client';

import { memo, useCallback, useState } from 'react';

import { MarkerType } from '@xyflow/react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { useUpdateEdge } from '../../../hooks/use-update-node';
import { ColorSelector } from '../ColorSelector';
import { PanelHeader } from '../PanelHeader';

import type { NodeColorVariant } from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

interface EdgePropertiesPanelProps {
  edge: Edge;
}

type LineStyle = 'solid' | 'dashed' | 'dotted';
type ArrowMode = 'none' | 'forward' | 'bidirectional';

export const EdgePropertiesPanel = memo(function EdgePropertiesPanel({
  edge,
}: EdgePropertiesPanelProps) {
  const { updateEdge } = useUpdateEdge(edge.id);
  const [isLocked, setIsLocked] = useState(false);

  const currentStyle = (edge.style?.strokeDasharray ? 'dashed' : 'solid') as LineStyle;
  const currentColor = (edge.style?.stroke as string) || NODE_PRESET_COLORS[0].hex;
  const currentLabel = typeof edge.label === 'string' ? edge.label : '';
  const currentThickness = String(edge.style?.strokeWidth ?? 1);

  const hasMarkerEnd = !!edge.markerEnd;
  const hasMarkerStart = !!edge.markerStart;
  const currentArrowMode: ArrowMode =
    hasMarkerStart && hasMarkerEnd ? 'bidirectional' : hasMarkerEnd ? 'forward' : 'none';

  const toggleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  const handleStyleChange = useCallback(
    (style: LineStyle) => {
      if (isLocked) return;
      const strokeDasharray = style === 'dashed' ? '5 5' : style === 'dotted' ? '2 2' : undefined;
      updateEdge({
        style: {
          ...edge.style,
          strokeDasharray,
        },
      });
    },
    [isLocked, updateEdge, edge.style],
  );

  const handleColorChange = useCallback(
    (variant: NodeColorVariant | string) => {
      if (isLocked) return;
      const hex = NODE_PRESET_COLORS.find((p) => p.variant === variant)?.hex ?? '#000000';
      updateEdge({
        style: {
          ...edge.style,
          stroke: hex,
        },
      });
    },
    [isLocked, updateEdge, edge.style],
  );

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      updateEdge({ label: e.target.value });
    },
    [isLocked, updateEdge],
  );

  const handleThicknessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;
      const numValue = Number(e.target.value);
      if (!isNaN(numValue) && numValue > 0) {
        updateEdge({
          style: {
            ...edge.style,
            strokeWidth: numValue,
          },
        });
      }
    },
    [isLocked, updateEdge, edge.style],
  );

  const handleArrowMode = useCallback(
    (mode: ArrowMode) => {
      if (isLocked) return;
      if (mode === currentArrowMode) {
        updateEdge({ markerStart: undefined, markerEnd: undefined });
        return;
      }
      if (mode === 'forward') {
        updateEdge({
          markerStart: undefined,
          markerEnd: { type: MarkerType.ArrowClosed },
        });
      } else if (mode === 'bidirectional') {
        updateEdge({
          markerStart: { type: MarkerType.ArrowClosed },
          markerEnd: { type: MarkerType.ArrowClosed },
        });
      } else {
        updateEdge({ markerStart: undefined, markerEnd: undefined });
      }
    },
    [isLocked, updateEdge, currentArrowMode],
  );

  const currentVariant =
    (NODE_PRESET_COLORS.find((p) => p.hex === currentColor)?.variant as NodeColorVariant) ||
    'black';

  return (
    <div className="flex h-full w-full flex-col">
      <PanelHeader title="선" subtitle="연결선" isLocked={isLocked} onToggleLock={toggleLock} />

      <div className="flex-1 space-y-0 overflow-y-auto p-4">
        {/* 라벨 */}
        <div className="border-b border-slate-200 pb-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-950">
              {EDITOR_MESSAGES.SIDEBAR_EDGE_LABEL_LABEL}
            </label>
            <input
              type="text"
              value={currentLabel}
              onChange={handleLabelChange}
              placeholder={EDITOR_MESSAGES.SIDEBAR_EDGE_LABEL_PLACEHOLDER}
              disabled={isLocked}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* 라인 스타일 */}
        <div className="border-b border-slate-200 py-4">
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-950">
              {EDITOR_MESSAGES.SIDEBAR_EDGE_STYLE_LABEL}
            </label>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <p className="w-10 text-sm text-black">
                  {EDITOR_MESSAGES.SIDEBAR_EDGE_STYLE_SOLID}
                </p>
                <button
                  onClick={() => handleStyleChange('solid')}
                  disabled={isLocked}
                  className={`h-9 flex-1 rounded-lg border ${
                    currentStyle === 'solid'
                      ? 'border-blue-500 bg-white'
                      : 'border-slate-200 bg-white'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-0.5 w-32 bg-black" />
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-10 text-sm text-black">
                  {EDITOR_MESSAGES.SIDEBAR_EDGE_STYLE_DASHED}
                </p>
                <button
                  onClick={() => handleStyleChange('dashed')}
                  disabled={isLocked}
                  className={`h-9 flex-1 rounded-lg border ${
                    currentStyle === 'dashed'
                      ? 'border-blue-500 bg-white'
                      : 'border-slate-200 bg-white'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <div
                      className="h-0.5 w-32 bg-black"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, black 0, black 5px, transparent 5px, transparent 10px)',
                      }}
                    />
                  </div>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-10 text-sm text-black">{EDITOR_MESSAGES.SIDEBAR_EDGE_STYLE_WAVY}</p>
                <button
                  onClick={() => handleStyleChange('dotted')}
                  disabled={isLocked}
                  className="h-9 flex-1 rounded-lg border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex h-full w-full items-center px-3">
                    <svg width="136" height="16" viewBox="0 0 136 16" fill="none">
                      <path
                        d="M0 8 Q 10 0, 20 8 T 40 8 T 60 8 T 80 8 T 100 8 T 120 8 T 136 8"
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* 화살표 */}
            <div className="flex items-center gap-2">
              <p className="w-10 text-sm text-black">{EDITOR_MESSAGES.SIDEBAR_EDGE_ARROW_LABEL}</p>
              <div className="flex flex-1 gap-2">
                <button
                  onClick={() => handleArrowMode('forward')}
                  disabled={isLocked}
                  aria-label={EDITOR_MESSAGES.SIDEBAR_EDGE_ARROW_FORWARD}
                  className={`h-9 flex-1 rounded-lg border ${
                    currentArrowMode === 'forward'
                      ? 'border-blue-500 bg-white'
                      : 'border-slate-200 bg-white'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                      <path
                        d="M0 8 L 15 8 M 15 8 L 10 3 M 15 8 L 10 13"
                        stroke="black"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={() => handleArrowMode('bidirectional')}
                  disabled={isLocked}
                  aria-label={EDITOR_MESSAGES.SIDEBAR_EDGE_ARROW_BIDIRECTIONAL}
                  className={`h-9 flex-1 rounded-lg border ${
                    currentArrowMode === 'bidirectional'
                      ? 'border-blue-500 bg-white'
                      : 'border-slate-200 bg-white'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                      <path
                        d="M5 3 L 0 8 L 5 13 M 0 8 L 20 8 M 15 3 L 20 8 L 15 13"
                        stroke="black"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 두께 */}
        <div className="border-b border-slate-200 py-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-950">
              {EDITOR_MESSAGES.SIDEBAR_EDGE_THICKNESS_LABEL}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={currentThickness}
                onChange={handleThicknessChange}
                disabled={isLocked}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-sm text-black">px</p>
            </div>
          </div>
        </div>

        {/* 기본 컬러 */}
        <div className="border-b border-slate-200 py-4">
          <ColorSelector
            type="node"
            nodeId={edge.id}
            currentVariant={currentVariant}
            presets={NODE_PRESET_COLORS}
            onPresetSelect={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
});
