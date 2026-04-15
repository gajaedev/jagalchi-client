'use client';

import { useAtom } from 'jotai';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ALargeSmall,
  CircleSmall,
  TimerReset,
  Maximize,
  Map as MapIcon,
  Folder,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { MY_ROADMAPS_MESSAGES } from '@/constants/messages';
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
        'flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors',
        isActive ? 'bg-slate-200 text-slate-950' : 'text-slate-950 hover:bg-slate-50',
      )}
    >
      <div className="flex h-5 w-5 items-center justify-center">{icon}</div>
      {label}
    </button>
  );
}

export function MyRoadmapsFilter() {
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [filterCategory, setFilterCategory] = useAtom(filterCategoryAtom);

  return (
    <div className="animate-in fade-in zoom-in-95 absolute top-[44px] right-0 z-50 flex gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-lg duration-100">
      <div className="flex w-[124px] flex-col gap-1">
        <p className="text-xs font-medium text-black">{MY_ROADMAPS_MESSAGES.SORT_ORDER_LABEL}</p>
        <Separator className="my-1" />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.SORT_DESC}
          isActive={sortOrder === 'desc'}
          onClick={() => setSortOrder('desc')}
          icon={<ArrowDownWideNarrow className="h-5 w-5" />}
        />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.SORT_ASC}
          isActive={sortOrder === 'asc'}
          onClick={() => setSortOrder('asc')}
          icon={<ArrowUpNarrowWide className="h-5 w-5" />}
        />
      </div>

      <div className="flex w-[130px] flex-col gap-1">
        <p className="text-xs font-medium text-black">{MY_ROADMAPS_MESSAGES.SORT_BY_LABEL}</p>
        <Separator className="my-1" />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.SORT_NAME}
          isActive={sortBy === 'name'}
          onClick={() => setSortBy('name')}
          icon={<ALargeSmall className="h-5 w-5" />}
        />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.SORT_RECENT}
          isActive={sortBy === 'recent'}
          onClick={() => setSortBy('recent')}
          icon={<TimerReset className="h-5 w-5" />}
        />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.SORT_SIZE}
          isActive={sortBy === 'size'}
          onClick={() => setSortBy('size')}
          icon={<Maximize className="h-5 w-5" />}
        />
      </div>

      <div className="flex w-[132px] flex-col gap-1">
        <p className="text-xs font-medium text-black">{MY_ROADMAPS_MESSAGES.FILTER_LABEL}</p>
        <Separator className="my-1" />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.FILTER_ALL}
          isActive={filterCategory === 'all'}
          onClick={() => setFilterCategory('all')}
          icon={<CircleSmall className="h-5 w-5" />}
        />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.FILTER_ROADMAP}
          isActive={filterCategory === 'roadmap'}
          onClick={() => setFilterCategory('roadmap')}
          icon={<MapIcon className="h-5 w-5" />}
        />
        <FilterDropdownItem
          label={MY_ROADMAPS_MESSAGES.FILTER_DIRECTORY}
          isActive={filterCategory === 'directory'}
          onClick={() => setFilterCategory('directory')}
          icon={<Folder className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}
