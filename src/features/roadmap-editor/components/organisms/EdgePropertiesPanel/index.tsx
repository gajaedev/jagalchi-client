'use client';

import { memo, useState } from 'react';

import { useSetAtom } from 'jotai';
import { Lock, Unlock } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{edge.id}</h3>
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
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 라인 스타일 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900">라인 스타일</label>
          <Select value={currentStyle} onValueChange={handleStyleChange} disabled={isLocked}>
            <SelectTrigger className="h-[36px] w-full">
              <SelectValue placeholder="스타일 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">실선</SelectItem>
              <SelectItem value="dashed">점선</SelectItem>
              <SelectItem value="dotted">점</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 기본 컬러 */}
        <ColorSelector
          type="node"
          nodeId={edge.id}
          currentVariant={currentVariant}
          presets={NODE_PRESET_COLORS}
          onPresetSelect={handleColorChange}
        />
      </div>
    </div>
  );
});
