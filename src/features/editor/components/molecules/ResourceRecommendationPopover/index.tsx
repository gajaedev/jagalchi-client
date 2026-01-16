'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EDITOR_MESSAGES } from '@/constants/messages';

import type { Resource } from '../../../types/editor.types';

interface ResourceRecommendationPopoverProps {
  trigger: React.ReactNode;
  onAddResource: (resource: Resource) => void;
}

const MOCK_RECOMMENDATIONS: Resource[] = [
  {
    id: '1',
    title: 'React 공식 문서',
    url: 'https://react.dev',
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs',
  },
  {
    id: '3',
    title: 'Next.js 공식 문서',
    url: 'https://nextjs.org/docs',
  },
];

export function ResourceRecommendationPopover({
  trigger,
  onAddResource,
}: ResourceRecommendationPopoverProps) {
  const [recommendations, setRecommendations] = useState<Resource[]>(MOCK_RECOMMENDATIONS);
  const [isLoading, setIsLoading] = useState(false);

  const handleRetry = async () => {
    setIsLoading(true);
    try {
      // TODO: API 호출 구현
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRecommendations(MOCK_RECOMMENDATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">{EDITOR_MESSAGES.AI_RECOMMEND_TITLE}</h4>
          </div>

          {isLoading ? (
            <div className="text-muted-foreground py-4 text-center text-sm">
              {EDITOR_MESSAGES.AI_RECOMMEND_LOADING}
            </div>
          ) : (
            <div className="space-y-2">
              {recommendations.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between gap-2 rounded-md border p-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{resource.title}</p>
                    <p className="text-muted-foreground truncate text-xs">{resource.url}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => onAddResource(resource)}>
                    {EDITOR_MESSAGES.AI_RECOMMEND_ADD}
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button variant="outline" className="w-full" onClick={handleRetry} disabled={isLoading}>
            {EDITOR_MESSAGES.AI_RECOMMEND_RETRY}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
