'use client';

import { useState } from 'react';

import { Lock } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export function SectionSidebar() {
  const [title, setTitle] = useState('Section_1');
  const [color, setColor] = useState('#3B82F6');
  const [colorText, setColorText] = useState('#3B82F6');
  const [isLocked, setLocked] = useState(false);

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
              <h2 className="text-lg font-semibold">섹션 편집</h2>
              <p className="text-muted-foreground text-sm">Section</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 p-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="section-title" className="text-sm font-medium">
                섹션 제목
              </Label>
              <Input
                id="section-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="섹션 제목 입력"
                className="h-10"
              />
            </div>

            <Separator />

            {/* Color - TODO: Phase 2 머지 후 새 ColorPicker로 교체 */}
            <div className="space-y-2">
              <Label htmlFor="section-color" className="text-sm font-medium">
                섹션 색상
              </Label>
              <div className="flex gap-2">
                <Input
                  id="section-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer"
                />
                <Input
                  type="text"
                  value={colorText}
                  onChange={(e) => handleColorTextChange(e.target.value)}
                  placeholder="#3B82F6"
                  className="h-10 flex-1 font-mono text-sm"
                />
              </div>
            </div>

            <Separator />

            {/* Lock Toggle */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <Lock className="text-muted-foreground size-4" />
                <div>
                  <Label htmlFor="section-lock" className="text-sm font-medium">
                    잠금
                  </Label>
                  <p className="text-muted-foreground text-xs">섹션을 잠가 수정을 방지합니다</p>
                </div>
              </div>
              <Switch id="section-lock" checked={isLocked} onCheckedChange={setLocked} />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
