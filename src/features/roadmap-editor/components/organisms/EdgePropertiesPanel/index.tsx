'use client';

import { memo, useState } from 'react';

import { useSetAtom } from 'jotai';
import { ArrowLeft, ArrowRight, Lock, Unlock } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { edgesAtom } from '../../../stores/editor-atoms';
import { EditorInput } from '../../atoms/EditorInput';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { NodeColorVariant } from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

interface EdgePropertiesPanelProps {
  edge: Edge;
}

type LineStyle = 'solid' | 'dashed' | 'curved';

/**
 * Edge 선택 시 표시되는 속성 패널
 *
 * Figma 디자인 기반 구조:
 * - Header: "선" 라벨 + "연결선" 서브텍스트 + Lock 버튼
 * - 라벨: 입력 필드
 * - 스타일: Button 그룹 (실선, 점선, 꺾인선)
 * - 화살표: Arrow 방향 컨트롤
 * - 두께: 숫자 입력
 * - 기본 컬러: ColorSelector
 */
export const EdgePropertiesPanel = memo(function EdgePropertiesPanel({
  edge,
}: EdgePropertiesPanelProps) {
  const setEdges = useSetAtom(edgesAtom);
  const [isLocked, setIsLocked] = useState(
    typeof edge.data === 'object' && edge.data !== null && 'isLocked' in edge.data
      ? (edge.data.isLocked as boolean)
      : false,
  );

  // Get current edge data
  const currentStyle = (edge.style?.strokeDasharray ? 'dashed' : 'solid') as LineStyle;
  const currentColor = (edge.style?.stroke as string) || NODE_PRESET_COLORS[0].hex;
  const currentThickness = (edge.style?.strokeWidth as number) || 1;

  const updateEdge = (updates: Partial<Edge>) => {
    setEdges((prev) => prev.map((e) => (e.id === edge.id ? { ...e, ...updates } : e)));
  };

  const toggleLock = () => {
    const newLockedState = !isLocked;
    setIsLocked(newLockedState);
    updateEdge({
      data: {
        ...edge.data,
        isLocked: newLockedState,
      },
    });
  };

  const handleStyleChange = (style: LineStyle) => {
    const strokeDasharray = style === 'dashed' ? '5 5' : undefined;
    updateEdge({
      style: {
        ...edge.style,
        strokeDasharray,
      },
    });
  };

  const handleThicknessChange = (value: string) => {
    const thickness = parseInt(value, 10);
    if (!Number.isNaN(thickness) && thickness > 0) {
      updateEdge({
        style: {
          ...edge.style,
          strokeWidth: thickness,
        },
      });
    }
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
        <div>
          <h3 className="text-sm font-semibold text-slate-900">선</h3>
          <p className="mt-0.5 text-xs text-slate-500">연결선</p>
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
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {/* 라벨 */}
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">라벨</label>
          <EditorInput
            value=""
            placeholder="라벨 없음"
            onChange={(_value) => {
              // TODO: Update edge label
            }}
            isDisabled={isLocked}
          />
        </div>

        {/* 스타일 - Button Group */}
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">스타일</label>
          <div className="flex gap-1">
            <Button
              variant={currentStyle === 'solid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleChange('solid')}
              disabled={isLocked}
            >
              실선
            </Button>
            <Button
              variant={currentStyle === 'dashed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleChange('dashed')}
              disabled={isLocked}
            >
              점선
            </Button>
            <Button
              variant={currentStyle === 'curved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleChange('curved')}
              disabled={isLocked}
            >
              꺾인선
            </Button>
          </div>
        </div>

        {/* 화살표 */}
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">화살표</label>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                // TODO: Toggle source arrow
              }}
              disabled={isLocked}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                // TODO: Toggle target arrow
              }}
              disabled={isLocked}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 두께 */}
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">두께</label>
          <div className="flex items-center gap-2">
            <EditorInput
              value={currentThickness.toString()}
              placeholder="1"
              onChange={handleThicknessChange}
              isDisabled={isLocked}
              className="flex-1"
            />
            <span className="text-muted-foreground text-sm">px</span>
          </div>
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

EdgePropertiesPanel.displayName = 'EdgePropertiesPanel';
