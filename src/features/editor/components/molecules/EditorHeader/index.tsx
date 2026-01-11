'use client';

import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SaveStatus } from '@/features/editor/types/editor.types';
import { cn } from '@/lib/utils';

interface EditorHeaderProps {
  title?: string;
  status: SaveStatus;
  onTitleChange?: (title: string) => void;
  onBack?: () => void;
  className?: string;
}

export function EditorHeader({
  title,
  status,
  onTitleChange,
  onBack,
  className,
}: EditorHeaderProps) {
  return (
    <header className={cn('bg-background flex h-16 items-center gap-4 border-b px-6', className)}>
      {onBack && (
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="뒤로 가기">
          <ArrowLeft className="size-5" />
        </Button>
      )}

      <div className="flex flex-1 items-center justify-center gap-3">
        {onTitleChange ? (
          <Input
            type="text"
            value={title || ''}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="로드맵 제목"
            className="h-10 max-w-md text-center text-lg font-semibold"
          />
        ) : (
          <h1 className="text-lg font-semibold">{title || '로드맵 제목'}</h1>
        )}

        {status === 'saved' && (
          <div
            className="flex items-center gap-1 text-sm text-green-600"
            role="status"
            aria-live="polite"
          >
            <Check className="size-4" />
            <span>(저장됨)</span>
          </div>
        )}

        {status === 'failed' && (
          <div
            className="text-destructive flex items-center gap-1 text-sm"
            role="status"
            aria-live="polite"
          >
            <AlertCircle className="size-4" />
            <span>(저장 실패)</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default EditorHeader;
