'use client';

import { useAtom } from 'jotai';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ALargeSmall,
  TimerReset,
  Maximize,
  Map as MapIcon,
  Folder,
} from 'lucide-react';

import {
  filterCategoryAtom,
  sortByAtom,
  sortOrderAtom,
} from '@/features/my-roadmaps/stores/my-roadmaps.atoms';
import { cn } from '@/lib/utils';

interface FilterItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

function FilterDropdownItem({ label, isActive, onClick, icon }: FilterItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
        isActive ? 'bg-[#E2E8F0] text-[#020617]' : 'text-slate-600 hover:bg-slate-50',
      )}
    >
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center',
          isActive ? 'text-[#020617]' : 'text-slate-500',
        )}
      >
        {icon}
      </div>
      {label}
    </button>
  );
}

export function MyRoadmapsFilter() {
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [filterCategory, setFilterCategory] = useAtom(filterCategoryAtom);

  return (
    <div className="animate-in fade-in zoom-in-95 border-border bg-background absolute top-[44px] right-0 z-50 flex min-w-[400px] gap-6 rounded-xl border p-4 shadow-lg duration-100">
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="mb-1 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          정렬순서
        </h3>
        <div className="mb-1 h-[1px] w-full bg-slate-100" />
        <FilterDropdownItem
          label="내림차순"
          isActive={sortOrder === 'desc'}
          onClick={() => setSortOrder('desc')}
          icon={<ArrowDownWideNarrow className="h-4 w-4" />}
        />
        <FilterDropdownItem
          label="오름차순"
          isActive={sortOrder === 'asc'}
          onClick={() => setSortOrder('asc')}
          icon={<ArrowUpNarrowWide className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 border-l border-slate-100 pl-4">
        <h3 className="mb-1 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          정렬기준
        </h3>
        <div className="mb-1 h-[1px] w-full bg-slate-100" />
        <FilterDropdownItem
          label="글자순"
          isActive={sortBy === 'name'}
          onClick={() => setSortBy('name')}
          icon={<ALargeSmall className="h-4 w-4" />}
        />
        <FilterDropdownItem
          label="최신순"
          isActive={sortBy === 'recent'}
          onClick={() => setSortBy('recent')}
          icon={<TimerReset className="h-4 w-4" />}
        />
        <FilterDropdownItem
          label="크기순"
          isActive={sortBy === 'size'}
          onClick={() => setSortBy('size')}
          icon={<Maximize className="h-4 w-4" />}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 border-l border-slate-100 pl-4">
        <h3 className="mb-1 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          필터링
        </h3>
        <div className="mb-1 h-[1px] w-full bg-slate-100" />
        <FilterDropdownItem
          label="전체"
          isActive={filterCategory === 'all'}
          onClick={() => setFilterCategory('all')}
          icon={
            <div
              className={cn(
                'h-2 w-2 rounded-full border border-current',
                filterCategory === 'all' ? 'bg-current' : 'bg-transparent',
              )}
            />
          }
        />
        <FilterDropdownItem
          label="로드맵"
          isActive={filterCategory === 'roadmap'}
          onClick={() => setFilterCategory('roadmap')}
          icon={<MapIcon className="h-4 w-4" />}
        />
        <FilterDropdownItem
          label="디렉토리"
          isActive={filterCategory === 'directory'}
          onClick={() => setFilterCategory('directory')}
          icon={<Folder className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}
