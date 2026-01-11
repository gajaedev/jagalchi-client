'use client';

import { useEffect, useState } from 'react';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { LineData, LineStyle } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface LineSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lineData?: LineData;
  onSave?: (data: LineData) => void;
  className?: string;
}

const LINE_STYLES: { value: LineStyle; label: string }[] = [
  { value: 'solid', label: '실선' },
  { value: 'dashed', label: '점선' },
  { value: 'dotted', label: '점선 (작은)' },
];

export function LineSidebar({ open, onOpenChange, lineData, onSave, className }: LineSidebarProps) {
  const [style, setStyle] = useState<LineStyle>(lineData?.style || 'solid');
  const [color, setColor] = useState(lineData?.color || '#000000');
  const [label, setLabel] = useState(lineData?.label || '');

  // Sync local state with prop changes for controlled component pattern
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (lineData) {
      setStyle(lineData.style);
      setColor(lineData.color);
      setLabel(lineData.label || '');
    }
  }, [lineData]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = () => {
    onSave?.({
      style,
      color,
      label: label || undefined,
    });
  };

  if (!open) return null;

  return (
    <div
      className={cn(
        'fixed top-0 right-0 z-50 h-full w-80',
        'bg-card border-border border-l shadow-lg',
        'transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full',
        className,
      )}
    >
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-lg font-semibold">선 편집</h2>
              <p className="text-muted-foreground text-sm">Line</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              aria-label="사이드바 닫기"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 p-4">
            {/* Line Style */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">선 스타일</Label>
              <div className="grid grid-cols-3 gap-2">
                {LINE_STYLES.map((lineStyle) => (
                  <Button
                    key={lineStyle.value}
                    type="button"
                    variant={style === lineStyle.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStyle(lineStyle.value)}
                    className="h-auto flex-col gap-1 py-2"
                  >
                    <div
                      className={cn(
                        'h-0.5 w-full',
                        lineStyle.value === 'solid' && 'border-t-2 border-current',
                        lineStyle.value === 'dashed' && 'border-t-2 border-dashed border-current',
                        lineStyle.value === 'dotted' && 'border-t-2 border-dotted border-current',
                      )}
                    />
                    <span className="text-xs">{lineStyle.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="line-color" className="text-sm font-medium">
                선 색상
              </Label>
              <div className="flex gap-2">
                <Input
                  id="line-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  className="h-10 flex-1 font-mono text-sm"
                />
              </div>
            </div>

            <Separator />

            {/* Label */}
            <div className="space-y-2">
              <Label htmlFor="line-label" className="text-sm font-medium">
                선 라벨 (선택)
              </Label>
              <Input
                id="line-label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="라벨 입력"
                className="h-10"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <Button onClick={handleSave} className="w-full" disabled={!onSave}>
              저장
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default LineSidebar;
