import React, { useState } from 'react';

import {
  Heart,
  Clock,
  Album,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ALargeSmall,
  TimerReset,
  Maximize,
  Circle,
  Map,
  Folder,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CommunityFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mb-[40px] flex w-full max-w-[960px] items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="h-9 gap-2 rounded-lg border-none bg-slate-900 px-4 text-white hover:bg-slate-800"
        >
          <Heart className="h-4 w-4 fill-white" />
          인기
        </Button>
        <Button
          variant="outline"
          className="h-9 gap-2 rounded-lg bg-white px-4 text-slate-900 hover:bg-slate-50"
        >
          <Clock className="h-4 w-4" />
          최신
        </Button>
        <Button
          variant="outline"
          className="h-9 gap-2 rounded-lg bg-white px-4 text-slate-900 hover:bg-slate-50"
        >
          <Album className="h-4 w-4" />
          저장된 로드맵
        </Button>
      </div>

      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="h-9 w-[128px] justify-between gap-2 rounded-lg border-slate-200 bg-white"
        >
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="h-4 w-4 text-slate-900" />
            <span className="text-sm">내림차순</span>
          </div>
          <ChevronDown
            className={cn('h-4 w-4 text-slate-400 transition-transform', isOpen && 'rotate-180')}
          />
        </Button>

        {isOpen && (
          <div className="absolute top-11 right-0 z-50 flex min-w-[400px] gap-8 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
            {/* 정렬순서 */}
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="px-2 py-1 text-[10px] font-bold text-slate-400">정렬순서</h3>
              <button className="flex w-full items-center gap-2 rounded-md bg-[#e2e8f0] px-2 py-1.5 text-xs font-medium text-slate-900">
                <ArrowDownWideNarrow className="h-4 w-4" />
                내림차순
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <ArrowUpNarrowWide className="h-4 w-4" />
                오름차순
              </button>
            </div>

            {/* 정렬기준 */}
            <div className="flex flex-1 flex-col gap-2 border-l border-slate-100 pl-4">
              <h3 className="px-2 py-1 text-[10px] font-bold text-slate-400">정렬기준</h3>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <ALargeSmall className="h-4 w-4" />
                글자순
              </button>
              <button className="flex w-full items-center gap-2 rounded-md bg-[#e2e8f0] px-2 py-1.5 text-xs font-medium text-slate-900">
                <TimerReset className="h-4 w-4" />
                최신순
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <Maximize className="h-4 w-4" />
                크기순
              </button>
            </div>

            {/* 필터링 */}
            <div className="flex flex-1 flex-col gap-2 border-l border-slate-100 pl-4">
              <h3 className="px-2 py-1 text-[10px] font-bold text-slate-400">필터링</h3>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <Circle className="mx-1.5 h-1 w-1 rounded-full bg-slate-400" />
                전체
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <Map className="h-4 w-4" />
                로드맵
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                <Folder className="h-4 w-4" />
                디렉토리
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
