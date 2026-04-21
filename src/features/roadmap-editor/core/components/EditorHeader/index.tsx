'use client';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue } from 'jotai';
import { ChevronLeft, Ellipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { REALTIME_MESSAGES } from '@/constants/messages';

import { roadmapTitleAtom } from '../../../stores/editor-atoms';

interface EditorHeaderProps {
  onBack?: () => void;
  isConnected?: boolean;
}

export const EditorHeader = memo(function EditorHeader({ onBack, isConnected }: EditorHeaderProps) {
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

        {isConnected !== undefined && (
          <span
            className="flex items-center gap-1 text-xs leading-4 font-medium"
            aria-label={
              isConnected
                ? REALTIME_MESSAGES.CONNECTION_CONNECTED
                : REALTIME_MESSAGES.CONNECTION_DISCONNECTED
            }
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-slate-400'
              }`}
            />
            <span className={isConnected ? 'text-green-600' : 'text-slate-400'}>
              {isConnected
                ? REALTIME_MESSAGES.CONNECTION_CONNECTED
                : REALTIME_MESSAGES.CONNECTION_DISCONNECTED}
            </span>
          </span>
        )}

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
