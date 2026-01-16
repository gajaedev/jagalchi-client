'use client';

import {
  AlignLeft,
  AlignCenterHorizontal,
  AlignRight,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  Move,
  Maximize,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/features/editor/components/atoms/ColorPicker';
import { useMultiSelection } from '@/features/editor/hooks';

type AlignmentType = 'left' | 'center-h' | 'right' | 'top' | 'center-v' | 'bottom';

interface MultiSelectionSidebarProps {
  selectedCount: number;
  onAlign?: (type: AlignmentType) => void;
  onSpacingChange?: (spacing: number) => void;
}

export function MultiSelectionSidebar({
  selectedCount,
  onAlign,
  onSpacingChange,
}: MultiSelectionSidebarProps) {
  const {
    spacing,
    setSpacing,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    alignmentButtons,
    handleAlign,
  } = useMultiSelection({ onAlign, onSpacingChange });

  const alignmentIcons = {
    left: AlignLeft,
    'center-h': AlignCenterHorizontal,
    right: AlignRight,
    top: AlignVerticalJustifyStart,
    'center-v': AlignVerticalJustifyCenter,
    bottom: AlignVerticalJustifyEnd,
  };

  return (
    <aside
      className="bg-background fixed right-0 h-full w-80 overflow-y-auto border-l p-6 shadow-lg"
      data-testid="multi-selection-sidebar"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">&gt;&gt; 노드 다중 선택</h2>
        <p className="text-muted-foreground mt-1 text-sm">{selectedCount}개 선택됨</p>
      </div>

      {/* Alignment Section */}
      <div className="mb-6">
        <Label className="mb-3">정렬</Label>
        <div className="grid grid-cols-3 gap-2">
          {alignmentButtons.map(({ type, label }) => {
            const Icon = alignmentIcons[type];
            return (
              <Button
                key={type}
                variant="outline"
                size="icon"
                onClick={() => handleAlign(type)}
                aria-label={label}
                data-testid={`align-${type}`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Spacing Section */}
      <div className="mb-6">
        <Label className="mb-3">간격</Label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Move spacing"
            data-testid="spacing-move"
          >
            <Move className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Maximize spacing"
            data-testid="spacing-maximize"
          >
            <Maximize className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="flex-1"
            placeholder="Mixed"
            data-testid="spacing-input"
          />
        </div>
      </div>

      {/* Node Name Section */}
      <div className="mb-6">
        <Label htmlFor="node-name" className="mb-3">
          노드 이름
        </Label>
        <Input
          id="node-name"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mixed"
          data-testid="node-name-input"
        />
      </div>

      {/* Node Description Section */}
      <div className="mb-6">
        <Label htmlFor="node-description" className="mb-3">
          노드 설명
        </Label>
        <Textarea
          id="node-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mixed"
          rows={4}
          data-testid="node-description-textarea"
        />
      </div>

      {/* Color Section */}
      <div className="mb-6">
        <Label className="mb-3">기본 컬러</Label>
        <ColorPicker value={color} onChange={setColor} data-testid="color-picker" />
      </div>
    </aside>
  );
}
