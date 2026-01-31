'use client';

import { memo, useState } from 'react';

import { useSetAtom } from 'jotai';
import { Lock, Unlock } from 'lucide-react';

import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { edgesAtom } from '../../../stores/editor-atoms';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { NodeColorVariant } from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

interface EdgePropertiesPanelProps {
  edge: Edge;
}

type LineStyle = 'solid' | 'dashed' | 'dotted';

/**
 * Edge 선택 시 표시되는 속성 패널
 *
 * Figma 디자인 기반 구조:
 * - Header: "Line_1" + Lock 버튼
 * - 라인 스타일: Select
 * - 기본 컬러: ColorSelector
 */
export const EdgePropertiesPanel = memo(function EdgePropertiesPanel({
  edge,
}: EdgePropertiesPanelProps) {
  const setEdges = useSetAtom(edgesAtom);
  const [isLocked, setIsLocked] = useState(false);

  // Get current edge data
  const currentStyle = (edge.style?.strokeDasharray ? 'dashed' : 'solid') as LineStyle;
  const currentColor = (edge.style?.stroke as string) || NODE_PRESET_COLORS[0].hex;

  const updateEdge = (updates: Partial<Edge>) => {
    setEdges((prev) => prev.map((e) => (e.id === edge.id ? { ...e, ...updates } : e)));
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleStyleChange = (style: LineStyle) => {
    const strokeDasharray = style === 'dashed' ? '5 5' : style === 'dotted' ? '2 2' : undefined;
    updateEdge({
      style: {
        ...edge.style,
        strokeDasharray,
      },
    });
  };

  const handleColorChange = (variant: NodeColorVariant | string) => {
    if (isLocked) return;
    const hex = NODE_PRESET_COLORS.find((p) => p.variant === variant)?.hex ?? '#000000';
    updateEdge({
      style: {
        ...edge.style,
        stroke: hex,
      },
    });
  };

  // Find current variant based on color
  const currentVariant =
    (NODE_PRESET_COLORS.find((p) => p.hex === currentColor)?.variant as NodeColorVariant) ||
    'black';

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-slate-900">선</h3>
          <p className="text-xs text-slate-600">연결선</p>
        </div>
        <button
          type="button"
          onClick={toggleLock}
          className="rounded-md p-1 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none"
          aria-label={isLocked ? '잠금 해제' : '잠금'}
        >
          {isLocked ? (
            <Lock className="h-4 w-4 text-slate-700" />
          ) : (
            <Unlock className="h-4 w-4 text-slate-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-0 overflow-y-auto p-4">
        {/* 라벨 */}
        <div className="border-b border-slate-200 pb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              {EDITOR_MESSAGES.SIDEBAR_EDGE_LABEL_LABEL}
            </label>
            <input
              type="text"
              placeholder="Value"
              disabled
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* 라인 스타일 */}
        <div className="border-b border-slate-200 py-4">
          <div className="space-y-4">
            <label className="text-sm font-medium text-slate-900">
              {EDITOR_MESSAGES.SIDEBAR_EDGE_STYLE_LABEL}
            </label>
            <div className="space-y-4">
              {/* 라인 스타일 */}
              {/* 실선 */}
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

              {/* 점선 */}
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

              {/* 꼬인선 */}
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
                  disabled
                  className="h-9 flex-1 rounded-lg border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
                  disabled
                  className="h-9 flex-1 rounded-lg border border-slate-200 bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              {EDITOR_MESSAGES.SIDEBAR_EDGE_THICKNESS_LABEL}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Value"
                disabled
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
