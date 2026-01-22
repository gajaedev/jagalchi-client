'use client';

import { memo, useState } from 'react';

import { useAtom } from 'jotai';
import { HexColorPicker } from 'react-colorful';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { isColorPickerOpenAtom, colorPickerTargetAtom } from '../../../stores/editor-atoms';

export const ColorPicker = memo(function ColorPicker() {
  const [isOpen, setIsOpen] = useAtom(isColorPickerOpenAtom);
  const [, setTarget] = useAtom(colorPickerTargetAtom);

  const [tempColor, setTempColor] = useState<string>('#3b82f6');

  const handleApply = () => {
    // TODO: Phase 2.1에서 customColor 필드 추가 후 구현
    // 현재는 프리셋 색상만 지원
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setTarget(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{EDITOR_MESSAGES.COLOR_PICKER_TITLE}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <HexColorPicker color={tempColor} onChange={setTempColor} />

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded border" style={{ backgroundColor: tempColor }} />
            <span className="font-mono text-sm">{tempColor}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {EDITOR_MESSAGES.COLOR_PICKER_CANCEL}
          </Button>
          <Button onClick={handleApply}>{EDITOR_MESSAGES.COLOR_PICKER_APPLY}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
