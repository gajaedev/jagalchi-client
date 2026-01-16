'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { LineStyle } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

const LINE_STYLES: { value: LineStyle; label: string }[] = [
  { value: 'solid', label: '실선' },
  { value: 'dashed', label: '점선' },
  { value: 'dotted', label: '점선 (작은)' },
];

export function LineSidebar() {
  const [style, setStyle] = useState<LineStyle>('solid');
  const [color, setColor] = useState('#000000');
  const [colorText, setColorText] = useState('#000000');
  const [label, setLabel] = useState('');

  const handleColorTextChange = (value: string) => {
    setColorText(value);
    // Only update color if it's a valid hex color
    if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)) {
      setColor(value);
    }
  };

  return (
    <div className="border-border bg-card fixed top-0 right-0 z-50 h-full w-80 border-l shadow-lg">
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-lg font-semibold">선 편집</h2>
              <p className="text-muted-foreground text-sm">Line</p>
            </div>
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

            {/* Color - TODO: Phase 2 머지 후 새 ColorPicker로 교체 */}
            <div className="space-y-2">
              <Label htmlFor="line-color" className="text-sm font-medium">
                선 색상
              </Label>
              <div className="flex gap-2">
                <Input
                  id="line-color"
                  type="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    setColorText(e.target.value);
                  }}
                  className="h-10 w-20 cursor-pointer"
                />
                <Input
                  type="text"
                  value={colorText}
                  onChange={(e) => handleColorTextChange(e.target.value)}
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
        </div>
      </ScrollArea>
    </div>
  );
}
