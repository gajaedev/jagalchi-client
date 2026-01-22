'use client';

import { useState } from 'react';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { LoadingButton } from '../../atoms/LoadingButton';

interface RoadmapGenerationFormProps {
  onSubmit: (prompt: string) => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export function RoadmapGenerationForm({
  onSubmit,
  isLoading = false,
  className,
}: RoadmapGenerationFormProps) {
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
        <label htmlFor="roadmap-prompt" className="text-xs font-medium text-neutral-700">
          로드맵 설명
        </label>
        <Textarea
          id="roadmap-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="생성할 로드맵의 정보를 자세히 알려주세요."
          className="h-[120px] resize-y"
          disabled={isLoading}
        />
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        loadingText="생성중"
        disabled={isSubmitDisabled}
        className="w-full"
      >
        로드맵 생성하기
      </LoadingButton>
    </form>
  );
}
