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

interface AddDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export function AddDirectoryModal({ isOpen, onClose, onConfirm }: AddDirectoryModalProps) {
  const [directoryName, setDirectoryName] = useState('');

  const handleConfirm = () => {
    if (!directoryName.trim()) return;
    onConfirm(directoryName.trim());
    setDirectoryName('');
    onClose();
  };

  const handleClose = () => {
    setDirectoryName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-2xl p-6 sm:max-w-[400px]" showCloseButton={false}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-bold text-slate-950">디렉토리 추가</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            value={directoryName}
            onChange={(e) => setDirectoryName(e.target.value)}
            placeholder="디렉토리 이름을 입력하세요"
            className="focus-visible:ring-primary h-10 rounded-lg border-slate-200 bg-white px-4 text-sm shadow-none"
          />
        </div>
        <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-9 rounded-lg border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!directoryName.trim()}
            className="h-9 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
