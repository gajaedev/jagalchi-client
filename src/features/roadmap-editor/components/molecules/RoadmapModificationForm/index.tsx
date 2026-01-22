'use client';

import { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { LoadingButton } from '../../atoms/LoadingButton';

interface RoadmapModificationFormProps {
  onSubmit: (prompt: string) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export function RoadmapModificationForm({
  onSubmit,
  isLoading = false,
  className,
}: RoadmapModificationFormProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      await onSubmit(prompt);
    }
  };

  const isSubmitDisabled = !prompt.trim() || isLoading;

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4', className)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="modification-prompt" className="text-xs font-medium text-neutral-700">
          수정 내용
        </label>
        <Textarea
          id="modification-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="수정할 내용을 자세히 알려주세요."
          className="h-[120px] resize-y"
          disabled={isLoading}
        />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        loadingText="수정중"
        disabled={isSubmitDisabled}
        className="w-full"
      >
        로드맵 수정하기
      </LoadingButton>
    </form>
  );
}
