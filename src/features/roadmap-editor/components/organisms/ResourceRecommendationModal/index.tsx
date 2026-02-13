'use client';

import { memo, useState } from 'react';

import { ExternalLink } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { LoadingButton } from '../../atoms/LoadingButton';

interface Resource {
  title: string;
  url: string;
  description: string;
}

interface ResourceRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeName?: string;
}

export const ResourceRecommendationModal = memo(function ResourceRecommendationModal({
  isOpen,
  onClose,
  nodeName = '',
}: ResourceRecommendationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);

  const handleRecommend = async () => {
    setIsLoading(true);
    try {
      // TODO: Phase 4 - Implement actual AI resource recommendation
      // eslint-disable-next-line no-console
      console.log('AI 자료 추천 요청:', nodeName);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock data for demonstration
      setResources([
        {
          title: '공식 문서',
          url: 'https://example.com/docs',
          description: '기초부터 심화까지 체계적으로 학습할 수 있는 공식 가이드',
        },
        {
          title: '입문 튜토리얼',
          url: 'https://example.com/tutorial',
          description: '초보자를 위한 단계별 실습 가이드',
        },
        {
          title: '유튜브 강의',
          url: 'https://example.com/youtube',
          description: '실무 경험을 바탕으로 한 심화 강의',
        },
      ]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('자료 추천 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{EDITOR_MESSAGES.AI_RESOURCE_MODAL_TITLE}</DialogTitle>
          {nodeName && (
            <p className="text-muted-foreground text-sm">
              &quot;{nodeName}&quot; {EDITOR_MESSAGES.AI_RESOURCE_MODAL_SUBTITLE}
            </p>
          )}
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground text-sm">
              {EDITOR_MESSAGES.AI_RESOURCE_MODAL_LOADING}
            </p>
          </div>
        )}

        {!isLoading && resources.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-muted-foreground text-sm">
              {EDITOR_MESSAGES.AI_RESOURCE_MODAL_EMPTY}
            </p>
            <LoadingButton onClick={handleRecommend} isLoading={isLoading}>
              {EDITOR_MESSAGES.AI_RESOURCE_MODAL_RECOMMEND_BUTTON}
            </LoadingButton>
          </div>
        )}

        {!isLoading && resources.length > 0 && (
          <>
            <ScrollArea className="max-h-[300px]">
              <div className="flex flex-col gap-3">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1 rounded-md border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{resource.title}</h4>
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </div>
                    <p className="text-muted-foreground text-xs">{resource.description}</p>
                  </a>
                ))}
              </div>
            </ScrollArea>

            <DialogFooter>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                {EDITOR_MESSAGES.AI_RESOURCE_MODAL_CLOSE}
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
});
