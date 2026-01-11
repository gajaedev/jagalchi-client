'use client';

import { useEffect, useState } from 'react';

import { X, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import type { SectionData } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface SectionSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionData?: SectionData;
  onSave?: (data: SectionData) => void;
  className?: string;
}

export function SectionSidebar({
  open,
  onOpenChange,
  sectionData,
  onSave,
  className,
}: SectionSidebarProps) {
  const [title, setTitle] = useState(sectionData?.title || '');
  const [color, setColor] = useState(sectionData?.color || '#3B82F6');
  const [locked, setLocked] = useState(sectionData?.locked || false);

  // Sync local state with prop changes for controlled component pattern
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (sectionData) {
      setTitle(sectionData.title);
      setColor(sectionData.color);
      setLocked(sectionData.locked);
    }
  }, [sectionData]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = () => {
    onSave?.({
      title,
      color,
      locked,
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
              <h2 className="text-lg font-semibold">섹션 편집</h2>
              <p className="text-muted-foreground text-sm">Section</p>
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

            {/* Color */}
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
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
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
              <Switch
                id="section-lock"
                checked={locked}
                onCheckedChange={setLocked}
                aria-checked={locked}
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

export default SectionSidebar;
