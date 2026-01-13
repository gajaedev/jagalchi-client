'use client';

import { X, Trash2, Copy, Lock, Unlock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { SelectionType, ElementData } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface MultiSelectionSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectionType: SelectionType;
  selectedCount: number;
  commonProperties?: Partial<ElementData>;
  onBulkUpdate?: (updates: Partial<ElementData>) => void;
  onBulkDelete?: () => void;
  onBulkDuplicate?: () => void;
  onBulkLock?: () => void;
  onBulkUnlock?: () => void;
  className?: string;
}

export function MultiSelectionSidebar({
  open,
  onOpenChange,
  selectionType,
  selectedCount,
  commonProperties,
  onBulkUpdate,
  onBulkDelete,
  onBulkDuplicate,
  onBulkLock,
  onBulkUnlock,
  className,
}: MultiSelectionSidebarProps) {
  const handleColorChange = (color: string) => {
    onBulkUpdate?.({ color });
  };

  const getSelectionLabel = () => {
    switch (selectionType) {
      case 'node':
        return '노드';
      case 'line':
        return '선';
      case 'section':
        return '섹션';
      case 'text':
        return '텍스트';
      case 'mixed':
        return '혼합';
      default:
        return '요소';
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
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-lg font-semibold">다중 선택</h2>
                <p className="text-muted-foreground text-sm">Multi Selection</p>
              </div>
              <Badge variant="secondary">
                {selectedCount}개 {getSelectionLabel()}
              </Badge>
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
            {/* Selection Info */}
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm">
                {selectedCount}개의 {getSelectionLabel()}이(가) 선택되었습니다.
              </p>
            </div>

            {/* Common Properties */}
            {selectionType !== 'mixed' && (
              <>
                <Separator />

                {/* Color (common to all types except mixed) */}
                <div className="space-y-2">
                  <Label htmlFor="multi-color" className="text-sm font-medium">
                    공통 색상
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="multi-color"
                      type="color"
                      value={commonProperties?.color || '#3B82F6'}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="h-10 w-20 cursor-pointer"
                      disabled={!onBulkUpdate}
                    />
                    <Input
                      type="text"
                      value={commonProperties?.color || '#3B82F6'}
                      onChange={(e) => handleColorChange(e.target.value)}
                      placeholder="#3B82F6"
                      className="h-10 flex-1 font-mono text-sm"
                      disabled={!onBulkUpdate}
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    선택한 모든 요소의 색상을 변경합니다
                  </p>
                </div>
              </>
            )}

            {selectionType === 'mixed' && (
              <div className="rounded-lg border border-dashed p-4 text-center">
                <p className="text-muted-foreground text-sm">
                  다른 종류의 요소가 선택되어
                  <br />
                  공통 속성을 편집할 수 없습니다.
                </p>
              </div>
            )}

            <Separator />

            {/* Bulk Actions */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">일괄 작업</Label>

              <div className="space-y-2">
                {/* Lock/Unlock */}
                {(selectionType === 'node' ||
                  selectionType === 'section' ||
                  selectionType === 'text') && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onBulkLock}
                      className="flex-1 gap-2"
                      disabled={!onBulkLock}
                    >
                      <Lock className="size-4" />
                      잠금
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onBulkUnlock}
                      className="flex-1 gap-2"
                      disabled={!onBulkUnlock}
                    >
                      <Unlock className="size-4" />
                      잠금 해제
                    </Button>
                  </div>
                )}

                {/* Duplicate */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onBulkDuplicate}
                  className="w-full gap-2"
                  disabled={!onBulkDuplicate}
                >
                  <Copy className="size-4" />
                  복제
                </Button>

                {/* Delete */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={onBulkDelete}
                  className="w-full gap-2"
                  disabled={!onBulkDelete}
                >
                  <Trash2 className="size-4" />
                  삭제
                </Button>
              </div>

              <p className="text-muted-foreground text-xs">주의: 삭제 작업은 되돌릴 수 없습니다.</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
