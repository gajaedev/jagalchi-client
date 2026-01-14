'use client';

import { useRef, useState } from 'react';

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
  Map as MapIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useClickOutside } from '../../../hooks/use-click-outside';
import {
  activeTabAtom,
  filterCategoryAtom,
  sortByAtom,
  sortOrderAtom,
} from '../../../stores/community.atoms';
import { ActiveTab } from '../../../types/community.types';

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
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium',
        isActive ? 'bg-muted text-foreground' : 'text-slate-600 hover:bg-slate-50',
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export function CommunityFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [filterCategory, setFilterCategory] = useAtom(filterCategoryAtom);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const TABS = [
    { id: 'popular', label: '인기', icon: Heart },
    { id: 'latest', label: '최신', icon: Clock },
    { id: 'saved', label: '저장된 로드맵', icon: Album },
  ] as const;

  return (
    <div className="relative mb-[40px] flex w-full max-w-[960px] items-center justify-between py-4">
      <div className="flex items-center gap-[12px]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={cn(
                'flex h-[36px] items-center gap-[8px] rounded-[8px] border px-[12px] py-[8px] transition-all',
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-foreground hover:border-slate-300',
              )}
            >
              <Icon
                className={cn('h-4 w-4', isActive ? 'text-primary-foreground' : 'text-foreground')}
              />
              <span className="text-[14px] leading-[20px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="border-border bg-background h-[36px] w-[116px] justify-between gap-[8px] rounded-[8px] px-[12px] py-[8px] shadow-sm hover:bg-slate-50"
        >
          <div className="flex items-center gap-[8px]">
            <ArrowDownWideNarrow className="text-foreground h-4 w-4" />
            <span className="text-foreground text-[14px] leading-[20px] font-medium">
              {sortOrder === 'desc' ? '내림차순' : '오름차순'}
            </span>
          </div>
          <ChevronDown
            className={cn('h-4 w-4 text-slate-400 transition-transform', isOpen && 'rotate-180')}
          />
        </Button>

        {isOpen && (
          <div className="animate-in fade-in zoom-in-95 border-border bg-background absolute top-[44px] right-0 z-50 flex min-w-[360px] gap-6 rounded-xl border p-4 shadow-lg duration-100">
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="mb-1 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                정렬순서
              </h3>
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
            </div>

            <div className="flex flex-1 flex-col gap-1 border-l border-slate-100 pl-4">
              <h3 className="mb-1 px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                필터링
              </h3>
              <FilterDropdownItem
                label="전체"
                isActive={filterCategory === 'all'}
                onClick={() => setFilterCategory('all')}
                icon={
                  <div
                    className={cn(
                      'mx-1.5 h-1.5 w-1.5 rounded-full',
                      filterCategory === 'all' ? 'bg-foreground' : 'bg-slate-300',
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
