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

interface SelectLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function SelectLocationModal({ isOpen, onClose, onConfirm }: SelectLocationModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <div className="flex flex-col gap-1">
                {/* User's Team Item */}
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-50">
                  <div className="flex h-6 w-6 items-center justify-center">
                    <Home className="h-5 w-5 text-slate-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">User&apos;s Team</span>
                </button>

                {/* Directory Items */}
                <div className="flex flex-col gap-1 pl-4">
                  <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-50">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <Folder className="h-5 w-5 text-slate-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Directory</span>
                  </button>
                  <button className="flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-50">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <Folder className="h-5 w-5 text-slate-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Directory</span>
                  </button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="flex gap-3 p-6 pt-4 sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 min-w-[100px] rounded-lg border-slate-200 text-base font-bold text-[#020617] hover:bg-slate-50"
          >
            취소
          </Button>
          <Button
            onClick={onConfirm}
            className="h-11 min-w-[100px] rounded-lg bg-[#81868f] text-base font-bold text-white shadow-sm hover:bg-[#6b7280]"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
