'use client';

import { useState } from 'react';

import { Folder, Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LocationItem {
  id: string;
  name: string;
  type: 'Team' | 'Directory';
  level: number;
  children?: LocationItem[];
}

interface SelectLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedId: string) => void;
}

const MOCK_LOCATIONS: LocationItem[] = [
  {
    id: 'team-1',
    name: "User's Team",
    type: 'Team',
    level: 0,
    children: [
      {
        id: 'dir-1',
        name: 'Directory',
        type: 'Directory',
        level: 1,
        children: [
          {
            id: 'dir-2',
            name: 'Directory',
            type: 'Directory',
            level: 2,
          },
          {
            id: 'dir-3',
            name: 'Directory',
            type: 'Directory',
            level: 2,
          },
        ],
      },
    ],
  },
];

export function SelectLocationModal({ isOpen, onClose, onConfirm }: SelectLocationModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClose = () => {
    setSearchQuery('');
    setSelectedId(null);
    onClose();
  };

  const filterLocations = (items: LocationItem[], query: string): LocationItem[] => {
    return items
      .map((item) => {
        const matches = item.name.toLowerCase().includes(query.toLowerCase());
        const filteredChildren = item.children ? filterLocations(item.children, query) : undefined;

        if (matches || (filteredChildren && filteredChildren.length > 0)) {
          return { ...item, children: filteredChildren } as LocationItem;
        }
        return null;
      })
      .filter((item): item is LocationItem => item !== null);
  };

  const filteredLocations = searchQuery
    ? filterLocations(MOCK_LOCATIONS, searchQuery)
    : MOCK_LOCATIONS;

  const renderLocationItems = (items: LocationItem[]) => {
    return items.map((item) => (
      <div key={item.id} className="flex flex-col gap-1">
        <button
          onClick={() => setSelectedId(item.id)}
          className={cn(
            'flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors',
            selectedId === item.id ? 'bg-[#0f172a] text-white' : 'text-slate-900 hover:bg-slate-50',
          )}
          style={{ marginLeft: `${item.level * 16}px` }}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            {item.type === 'Team' ? (
              <Home
                className={cn('h-5 w-5', selectedId === item.id ? 'text-white' : 'text-slate-600')}
              />
            ) : (
              <Folder
                className={cn('h-5 w-5', selectedId === item.id ? 'text-white' : 'text-slate-600')}
              />
            )}
          </div>
          <span
            className={cn(
              'text-sm font-semibold',
              selectedId === item.id ? 'text-white' : 'text-slate-900',
            )}
          >
            {item.name}
          </span>
        </button>
        {item.children && renderLocationItems(item.children)}
      </div>
    ));
  };

  const handleConfirm = () => {
    if (selectedId) {
      onConfirm(selectedId);
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-[480px] gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-xl"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-[#020617]">위치선택</DialogTitle>
          <DialogDescription className="sr-only">
            이동하거나 저장할 위치를 선택하세요.
          </DialogDescription>
          <div className="relative w-[210px]">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="h-9 w-full rounded-lg border-slate-200 bg-white pr-4 pl-9 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-slate-300"
            />
          </div>
        </DialogHeader>

        <div className="px-6 py-2">
          <div className="rounded-xl border border-slate-100 p-4">
            <h3 className="mb-4 text-xl font-bold text-[#020617]">Root</h3>
            <ScrollArea className="h-[320px] pr-4">
              <div className="flex flex-col gap-1">{renderLocationItems(filteredLocations)}</div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="flex gap-3 p-6 pt-4 sm:justify-end">
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-11 min-w-[100px] rounded-lg border-slate-200 text-base font-bold text-[#020617] hover:bg-slate-50"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            className={cn(
              'h-11 min-w-[100px] rounded-lg text-base font-bold text-white shadow-sm transition-colors',
              selectedId ? 'bg-[#0f172a] hover:bg-[#1e293b]' : 'cursor-not-allowed bg-[#81868f]',
            )}
            disabled={!selectedId}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
