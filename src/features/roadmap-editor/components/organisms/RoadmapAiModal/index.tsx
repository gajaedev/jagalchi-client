'use client';

import { memo, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { RoadmapGenerationForm } from '../RoadmapGenerationForm';
import { RoadmapModificationForm } from '../RoadmapModificationForm';

type ModalMode = 'generate' | 'modify';

interface RoadmapAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
}

export const RoadmapAiModal = memo(function RoadmapAiModal({
  isOpen,
  onClose,
  mode,
}: RoadmapAiModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    try {
      // TODO: Phase 4 - Implement actual AI roadmap generation
      // eslint-disable-next-line no-console
      console.log('AI 로드맵 생성 요청:', prompt);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로드맵 생성 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = async (prompt: string) => {
    setIsLoading(true);
    try {
      // TODO: Phase 4 - Implement actual AI roadmap modification
      // eslint-disable-next-line no-console
      console.log('AI 로드맵 수정 요청:', prompt);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로드맵 수정 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const title =
    mode === 'generate'
      ? EDITOR_MESSAGES.AI_MODAL_GENERATE_TITLE
      : EDITOR_MESSAGES.AI_MODAL_MODIFY_TITLE;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {mode === 'generate' ? (
          <RoadmapGenerationForm
            onGenerate={handleGenerate}
            onCancel={onClose}
            isLoading={isLoading}
          />
        ) : (
          <RoadmapModificationForm
            onModify={handleModify}
            onCancel={onClose}
            isLoading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
});
