'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface AddRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export function AddRoadmapModal({ isOpen, onClose, onConfirm }: AddRoadmapModalProps) {
  const [roadmapName, setRoadmapName] = useState('');

  const handleConfirm = () => {
    onConfirm(roadmapName);
    setRoadmapName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl p-6 sm:max-w-[440px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-bold text-[#020617]">로드맵 추가</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={roadmapName}
            onChange={(e) => setRoadmapName(e.target.value)}
            placeholder="로드맵 이름을 입력하세요"
            className="focus-visible:ring-primary h-12 border-slate-200 bg-white px-4 text-sm shadow-none"
          />
        </div>
        <DialogFooter className="mt-6 flex items-center justify-between sm:justify-between">
          <button
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
            onClick={() => {
              /* Handle advanced settings */
            }}
          >
            자세히 설정하기
          </button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-9 rounded-lg border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              취소
            </Button>
            <Button
              onClick={handleConfirm}
              className="h-9 rounded-lg bg-[#64748B] px-4 text-sm font-semibold text-white hover:bg-[#475569]"
            >
              확인
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
