'use client';

import { useState } from 'react';

import { Sparkles, X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface RoadmapAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

type TabType = 'create' | 'edit';

export function RoadmapAiModal({ isOpen, onClose, className }: RoadmapAiModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('create');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={cn(
            'w-[480px] p-0 shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            className,
          )}
          showCloseButton={false}
        >
          {/* Header */}
          <div className="flex h-9 items-center justify-between bg-neutral-900 px-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-neutral-0 h-4 w-4" aria-hidden="true" />
              <DialogTitle className="text-neutral-0 text-sm font-medium">
                {activeTab === 'create' ? '로드맵 생성' : '로드맵 수정'}
              </DialogTitle>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-0 transition-colors hover:text-neutral-300"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Tab System */}
          <div className="border-b border-neutral-200">
            <div className="flex">
              <button
                type="button"
                onClick={() => setActiveTab('create')}
                className={cn(
                  'flex-1 px-4 py-2 text-sm font-medium transition-colors',
                  'focus:ring-primary-500 focus:ring-2 focus:outline-none',
                  activeTab === 'create'
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'bg-neutral-0 text-neutral-700 hover:bg-neutral-50',
                )}
                aria-pressed={activeTab === 'create'}
              >
                로드맵 생성
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={cn(
                  'flex-1 px-4 py-2 text-sm font-medium transition-colors',
                  'focus:ring-primary-500 focus:ring-2 focus:outline-none',
                  activeTab === 'edit'
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'bg-neutral-0 text-neutral-700 hover:bg-neutral-50',
                )}
                aria-pressed={activeTab === 'edit'}
              >
                로드맵 수정
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[320px] p-4">
            {activeTab === 'create' && (
              <div className="text-sm text-neutral-700">로드맵 생성 폼이 여기에 표시됩니다.</div>
            )}
            {activeTab === 'edit' && (
              <div className="text-sm text-neutral-700">로드맵 수정 폼이 여기에 표시됩니다.</div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
