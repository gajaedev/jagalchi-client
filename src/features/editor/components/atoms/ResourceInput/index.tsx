'use client';

import { forwardRef } from 'react';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ResourceInputProps {
  url: string;
  title: string;
  onUrlChange: (url: string) => void;
  onTitleChange: (title: string) => void;
  onRemove?: () => void;
  placeholder?: {
    url?: string;
    title?: string;
  };
  className?: string;
}

export const ResourceInput = forwardRef<HTMLDivElement, ResourceInputProps>(
  ({ url, title, onUrlChange, onTitleChange, onRemove, placeholder, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2 rounded-md border p-3', className)}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <div className="space-y-1">
              <Label htmlFor={`url-${url}`} className="text-xs">
                자료 링크
              </Label>
              <Input
                id={`url-${url}`}
                type="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder={placeholder?.url || '자료 링크 입력'}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`title-${url}`} className="text-xs">
                자료 제목
              </Label>
              <Input
                id={`title-${url}`}
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder={placeholder?.title || '자료 제목 입력'}
                className="h-9 text-sm"
              />
            </div>
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-8 w-8 shrink-0"
              aria-label="자료 삭제"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
      </div>
    );
  },
);

ResourceInput.displayName = 'ResourceInput';

export default ResourceInput;
