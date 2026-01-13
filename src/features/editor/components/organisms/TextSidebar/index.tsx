'use client';

import { useEffect, useState } from 'react';

import { X, Lock, Minus, Plus, Bold } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { TextData, FontWeight } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface TextSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  textData?: TextData;
  onSave?: (data: TextData) => void;
  className?: string;
}

export function TextSidebar({ open, onOpenChange, textData, onSave, className }: TextSidebarProps) {
  const [content, setContent] = useState(textData?.content || '');
  const [fontSize, setFontSize] = useState(textData?.fontSize || 16);
  const [fontWeight, setFontWeight] = useState<FontWeight>(textData?.fontWeight || 'normal');
  const [color, setColor] = useState(textData?.color || '#000000');
  const [colorText, setColorText] = useState(textData?.color || '#000000');
  const [isLocked, setLocked] = useState(textData?.isLocked || false);

  // Sync local state with prop changes for controlled component pattern
  useEffect(() => {
    if (textData) {
      setContent(textData.content);
      setFontSize(textData.fontSize);
      setFontWeight(textData.fontWeight);
      setColor(textData.color);
      setColorText(textData.color);
      setLocked(textData.isLocked);
    } else {
      // Reset to defaults when textData is cleared
      setContent('');
      setFontSize(16);
      setFontWeight('normal');
      setColor('#000000');
      setColorText('#000000');
      setLocked(false);
    }
  }, [textData]);

  // Sync colorText with color changes from color picker
  useEffect(() => {
    setColorText(color);
  }, [color]);

  const handleSave = () => {
    onSave?.({
      content,
      fontSize,
      fontWeight,
      color,
      isLocked,
    });
  };

  const handleFontSizeChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 8 && num <= 72) {
      setFontSize(num);
    }
  };

  const handleColorTextChange = (value: string) => {
    setColorText(value);
    // Only update color if it's a valid hex color
    if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)) {
      setColor(value);
    }
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
              <h2 className="text-lg font-semibold">텍스트 편집</h2>
              <p className="text-muted-foreground text-sm">Text</p>
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
            {/* Text Content */}
            <div className="space-y-2">
              <Label htmlFor="text-content" className="text-sm font-medium">
                텍스트 내용
              </Label>
              <Textarea
                id="text-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="텍스트 입력"
                className="min-h-[100px] resize-y"
              />
            </div>

            <Separator />

            {/* Font Size */}
            <div className="space-y-2">
              <Label htmlFor="font-size" className="text-sm font-medium">
                글자 크기
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFontSize(Math.max(8, fontSize - 1))}
                  aria-label="글자 크기 감소"
                >
                  <Minus className="size-4" />
                </Button>
                <Input
                  id="font-size"
                  type="number"
                  min="8"
                  max="72"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(e.target.value)}
                  className="h-10 w-20 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFontSize(Math.min(72, fontSize + 1))}
                  aria-label="글자 크기 증가"
                >
                  <Plus className="size-4" />
                </Button>
                <span className="text-muted-foreground text-sm">px</span>
              </div>
            </div>

            {/* Font Weight */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">글자 두께</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={fontWeight === 'normal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontWeight('normal')}
                  className="flex-1"
                >
                  보통
                </Button>
                <Button
                  type="button"
                  variant={fontWeight === 'bold' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFontWeight('bold')}
                  className="flex-1 gap-1"
                >
                  <Bold className="size-3" />
                  굵게
                </Button>
              </div>
            </div>

            <Separator />

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="text-color" className="text-sm font-medium">
                글자 색상
              </Label>
              <div className="flex gap-2">
                <Input
                  id="text-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
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

            {/* Lock Toggle */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <Lock className="text-muted-foreground size-4" />
                <div>
                  <Label htmlFor="text-lock" className="text-sm font-medium">
                    잠금
                  </Label>
                  <p className="text-muted-foreground text-xs">텍스트를 잠가 수정을 방지합니다</p>
                </div>
              </div>
              <Switch
                id="text-lock"
                checked={isLocked}
                onCheckedChange={setLocked}
                aria-checked={isLocked}
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

export default TextSidebar;
