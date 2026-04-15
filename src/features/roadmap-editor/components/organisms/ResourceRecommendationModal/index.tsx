'use client';

import { memo, useState } from 'react';

import { ExternalLink } from 'lucide-react';

import type { ResourceItem } from '@/api/ai';
import { getResourceRecommendation } from '@/api/ai';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EDITOR_MESSAGES } from '@/constants/messages';
import { sanitizeUrl } from '@/lib/url-validation';

import { LoadingButton } from '../../atoms/LoadingButton';

interface ResourceRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeName?: string;
  onAddResource?: (url: string) => void;
}

export const ResourceRecommendationModal = memo(function ResourceRecommendationModal({
  isOpen,
  onClose,
  nodeName = '',
  onAddResource,
}: ResourceRecommendationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRecommend = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const query = nodeName || EDITOR_MESSAGES.DEFAULT_RESOURCE_QUERY;
      const response = await getResourceRecommendation({ query, top_k: 5 });
      setResources(response.items);
    } catch {
      setErrorMessage(EDITOR_MESSAGES.AI_RESOURCE_MODAL_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setResources([]);
    setErrorMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{EDITOR_MESSAGES.AI_RESOURCE_MODAL_TITLE}</DialogTitle>
          {nodeName && (
            <p className="text-muted-foreground text-sm">
              &quot;{nodeName}&quot; {EDITOR_MESSAGES.AI_RESOURCE_MODAL_SUBTITLE}
            </p>
          )}
        </DialogHeader>

        {errorMessage && (
          <p className="text-destructive text-sm" role="alert">
            {errorMessage}
          </p>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground text-sm">
              {EDITOR_MESSAGES.AI_RESOURCE_MODAL_LOADING}
            </p>
          </div>
        )}

        {!isLoading && resources.length === 0 && !errorMessage && (
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
                  <div
                    key={index}
                    className="flex flex-col gap-1 rounded-md border p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={sanitizeUrl(resource.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <h4 className="text-sm font-medium">{resource.title}</h4>
                        <ExternalLink className="h-3 w-3 text-gray-400" />
                      </a>
                      {onAddResource && (
                        <button
                          type="button"
                          onClick={() => onAddResource(resource.url)}
                          className="rounded px-2 py-0.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                        >
                          {EDITOR_MESSAGES.SIDEBAR_ADD_RESOURCE_BUTTON}
                        </button>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">{resource.source}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <DialogFooter>
              <button
                type="button"
                onClick={handleClose}
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
