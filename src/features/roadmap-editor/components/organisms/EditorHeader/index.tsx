'use client';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue } from 'jotai';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { roadmapTitleAtom } from '../../../stores/editor-atoms';

interface EditorHeaderProps {
  onBack?: () => void;
}

export const EditorHeader = memo(function EditorHeader({ onBack }: EditorHeaderProps) {
  const router = useRouter();
  const title = useAtomValue(roadmapTitleAtom);

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/myroadmap');
    }
  };

  return (
    <header className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleBackClick}
        aria-label="뒤로가기"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm font-medium">{title || 'Jagalchi Roadmap'}</span>
    </header>
  );
});
