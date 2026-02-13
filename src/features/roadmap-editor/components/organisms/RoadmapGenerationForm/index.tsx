'use client';

import { memo, useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { LoadingButton } from '../../atoms/LoadingButton';

interface RoadmapGenerationFormProps {
  onGenerate: (prompt: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const RoadmapGenerationForm = memo(function RoadmapGenerationForm({
  onGenerate,
  onCancel,
  isLoading = false,
}: RoadmapGenerationFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  const isDisabled = !prompt.trim() || isLoading;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={EDITOR_MESSAGES.AI_MODAL_GENERATE_PLACEHOLDER}
          className="min-h-[120px] resize-none"
          disabled={isLoading}
        />
        {isLoading && (
          <p className="text-muted-foreground text-sm">{EDITOR_MESSAGES.AI_MODAL_LOADING}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          {EDITOR_MESSAGES.AI_MODAL_CANCEL}
        </button>
        <LoadingButton
          type="submit"
          disabled={isDisabled}
          isLoading={isLoading}
          className="px-4 py-2"
        >
          {EDITOR_MESSAGES.AI_MODAL_GENERATE_BUTTON}
        </LoadingButton>
      </div>
    </form>
  );
});
