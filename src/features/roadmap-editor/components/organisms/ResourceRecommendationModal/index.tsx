'use client';

import { Sparkles, X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { ResourceCard } from '../../molecules/ResourceCard';

interface Resource {
  id: string;
  title: string;
  url: string;
}

interface ResourceRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  onAddResource?: (resource: Resource) => void;
  isLoading?: boolean;
  className?: string;
}

export function ResourceRecommendationModal({
  isOpen,
  onClose,
  resources,
  onAddResource,
  isLoading = false,
  className,
}: ResourceRecommendationModalProps) {
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
              <DialogTitle className="text-neutral-0 text-sm font-medium">자료 추천</DialogTitle>
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

          {/* Content Area */}
          <div className="max-h-[400px] overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-neutral-700">자료를 불러오는 중...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm text-neutral-700">추천할 자료가 없습니다.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    url={resource.url}
                    onAdd={onAddResource ? () => onAddResource(resource) : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
