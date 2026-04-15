'use client';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue } from 'jotai';
import { ChevronLeft, Ellipsis } from 'lucide-react';

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
    <header className="absolute top-4 left-4 z-10 flex w-fit flex-col gap-4 rounded-lg border border-slate-200 bg-white p-2 shadow-md">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="min-h-8 min-w-8 rounded-lg p-[7px]"
          onClick={handleBackClick}
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-[15px] w-[15px]" />
        </Button>

        <span className="text-base leading-6 font-semibold whitespace-nowrap text-slate-950">
          {title || 'Jagalchi Roadmap'}
        </span>

        <span className="text-xs leading-4 font-medium tracking-[0.18px] text-slate-500">
          (수정중)
        </span>

        <button
          type="button"
          className="flex min-h-8 min-w-8 items-center justify-center rounded-lg p-[7px] hover:bg-slate-100"
          aria-label="더보기"
        >
          <Ellipsis className="h-[15px] w-[15px] text-slate-950" />
        </button>
      </div>

      <Button className="h-8 w-full rounded-lg bg-slate-900 px-3 py-[5.5px] text-sm font-semibold text-white hover:bg-slate-800">
        Readme 수정
      </Button>
    </header>
  );
});
