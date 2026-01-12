'use client';

import { useState } from 'react';

import { useAtom } from 'jotai';
import {
  Heart,
  Clock,
  Album,
  ArrowDownWideNarrow,
  ChevronDown,
  ArrowUpNarrowWide,
  ALargeSmall,
  TimerReset,
  Maximize,
  Map,
  Folder,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  activeTabAtom,
  filterCategoryAtom,
  sortByAtom,
  sortOrderAtom,
} from '../../stores/community.atoms';

export function CommunityFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [filterCategory, setFilterCategory] = useAtom(filterCategoryAtom);

  return (
    <div className="relative mb-[40px] flex w-full max-w-[960px] items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setActiveTab('popular')}
          className={cn(
            'h-9 gap-2 rounded-lg border-none px-4 transition-colors',
            activeTab === 'popular'
              ? 'bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-white text-slate-900 hover:bg-slate-50',
          )}
        >
          <Heart className={cn('h-4 w-4', activeTab === 'popular' && 'fill-white')} />
          인기
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveTab('latest')}
          className={cn(
            'h-9 gap-2 rounded-lg px-4 transition-colors',
            activeTab === 'latest'
              ? 'border-none bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-white text-slate-900 hover:bg-slate-50',
          )}
        >
          <Clock className={cn('h-4 w-4', activeTab === 'latest' && 'fill-white')} />
          최신
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveTab('saved')}
          className={cn(
            'h-9 gap-2 rounded-lg px-4 transition-colors',
            activeTab === 'saved'
              ? 'border-none bg-slate-900 text-white hover:bg-slate-800'
              : 'bg-white text-slate-900 hover:bg-slate-50',
          )}
        >
          <Album className={cn('h-4 w-4', activeTab === 'saved' && 'fill-white')} />
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
            {sortOrder === 'desc' ? (
              <ArrowDownWideNarrow className="h-4 w-4 text-slate-900" />
            ) : (
              <ArrowUpNarrowWide className="h-4 w-4 text-slate-900" />
            )}
            <span className="text-sm">{sortOrder === 'desc' ? '내림차순' : '오름차순'}</span>
          </div>
          <ChevronDown
            className={cn('h-4 w-4 text-slate-400 transition-transform', isOpen && 'rotate-180')}
          />
        </Button>

        {isOpen && (
          <div className="absolute top-11 right-0 z-50 flex min-w-[400px] gap-8 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="px-2 py-1 text-[10px] font-bold text-slate-400">정렬순서</h3>
              <button
                onClick={() => setSortOrder('desc')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  sortOrder === 'desc'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <ArrowDownWideNarrow className="h-4 w-4" />
                내림차순
              </button>
              <button
                onClick={() => setSortOrder('asc')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  sortOrder === 'asc'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <ArrowUpNarrowWide className="h-4 w-4" />
                오름차순
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 border-l border-slate-100 pl-4">
              <h3 className="px-2 py-1 text-[10px] font-bold text-slate-400">정렬기준</h3>
              <button
                onClick={() => setSortBy('name')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  sortBy === 'name'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <ALargeSmall className="h-4 w-4" />
                글자순
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  sortBy === 'recent'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <TimerReset className="h-4 w-4" />
                최신순
              </button>
              <button
                onClick={() => setSortBy('size')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  sortBy === 'size'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <Maximize className="h-4 w-4" />
                크기순
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 border-l border-slate-100 pl-4">
              <h3 className="px-2 py-1 text-[10px] font-bold text-slate-400">필터링</h3>
              <button
                onClick={() => setFilterCategory('all')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  filterCategory === 'all'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <div
                  className={cn(
                    'mx-1.5 h-1 w-1 rounded-full',
                    filterCategory === 'all' ? 'bg-slate-900' : 'bg-slate-400',
                  )}
                />
                전체
              </button>
              <button
                onClick={() => setFilterCategory('roadmap')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  filterCategory === 'roadmap'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
                <Map className="h-4 w-4" />
                로드맵
              </button>
              <button
                onClick={() => setFilterCategory('directory')}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
                  filterCategory === 'directory'
                    ? 'bg-[#e2e8f0] text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50',
                )}
              >
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
