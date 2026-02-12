'use client';

import { useRef, useState } from 'react';

import { ListFilter, Plus, Search } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { useClickOutside } from '../../../hooks/use-click-outside';
import { AddDirectoryModal } from '../AddDirectoryModal';
import { AddRoadmapModal } from '../AddRoadmapModal';
import { MyRoadmapsFilter } from '../MyRoadmapsFilter';

export function MyRoadmapsToolbar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [isDirectoryModalOpen, setIsDirectoryModalOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setIsFilterOpen(false));

  const handleAddRoadmap = (_name: string, _locationId?: string | null) => {
    // TODO: Implement actual roadmap creation logic
  };

  const handleAddDirectory = (_name: string) => {
    // TODO: Implement actual directory creation logic
  };

  return (
    <div className="flex w-full items-center justify-between py-6">
      <Breadcrumb className="flex h-9 items-center">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Components</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-[10px]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="로드맵 검색"
            className="border-border h-9 w-[240px] bg-white pl-9 text-xs"
          />
        </div>
        <div className="relative" ref={filterRef}>
          <Button
            variant="outline"
            size="icon"
            aria-label="Filter"
            className={cn(
              'border-border h-9 w-9 transition-colors',
              isFilterOpen && 'bg-slate-100',
            )}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <ListFilter className="text-muted-foreground h-4 w-4" />
          </Button>

          {isFilterOpen && <MyRoadmapsFilter />}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-9 rounded-md bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4ED8]">
              New
              <Plus className="ml-1.5 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[140px] rounded-xl border-[#E5E7EB] bg-white p-1.5 shadow-xl"
          >
            <DropdownMenuItem
              className="flex cursor-pointer items-center rounded-lg px-3 py-2.5 transition-colors outline-none focus:bg-[#F3F4F6]"
              onClick={() => setIsRoadmapModalOpen(true)}
            >
              <span className="text-[13px] font-semibold text-[#374151]">로드맵</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer items-center rounded-lg px-3 py-2.5 transition-colors outline-none focus:bg-[#F3F4F6]"
              onClick={() => setIsDirectoryModalOpen(true)}
            >
              <span className="text-[13px] font-semibold text-[#374151]">디렉토리</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddRoadmapModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        onConfirm={handleAddRoadmap}
      />
      <AddDirectoryModal
        isOpen={isDirectoryModalOpen}
        onClose={() => setIsDirectoryModalOpen(false)}
        onConfirm={handleAddDirectory}
      />
    </div>
  );
}
