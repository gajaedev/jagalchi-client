'use client';

import { memo, useState } from 'react';

import dynamic from 'next/dynamic';

import { useAtom, useSetAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EDITOR_MESSAGES } from '@/constants/messages';

import {
  isColorPickerOpenAtom,
  colorPickerTargetAtom,
  nodesAtom,
  edgesAtom,
} from '../../../stores/editor-atoms';

const HexColorPicker = dynamic(
  () => import('react-colorful').then((m) => ({ default: m.HexColorPicker })),
  { ssr: false },
);

export const ColorPicker = memo(function ColorPicker() {
  const [isOpen, setIsOpen] = useAtom(isColorPickerOpenAtom);
  const [target, setTarget] = useAtom(colorPickerTargetAtom);
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);

  const [tempColor, setTempColor] = useState<string>('#3b82f6');

  const handleApply = () => {
    if (!target) {
      handleClose();
      return;
    }

    // Validate hex color format
    if (!/^#[0-9a-fA-F]{6}$/.test(tempColor)) {
      handleClose();
      return;
    }

    if (target.type === 'node' || target.type === 'text') {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== target.nodeId) return node;
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: tempColor,
            },
          };
        }),
      );
    } else if (target.type === 'edge') {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id !== target.edgeId) return edge;
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: tempColor,
            },
          };
        }),
      );
    }

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
            <div
              className="h-8 w-8 shrink-0 rounded border"
              style={{ backgroundColor: tempColor }}
            />
            <input
              type="text"
              value={tempColor}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '' || val === '#') {
                  setTempColor(val);
                  return;
                }
                const hex = val.startsWith('#') ? val : `#${val}`;
                if (hex.length <= 7) {
                  setTempColor(hex);
                }
              }}
              placeholder={EDITOR_MESSAGES.COLOR_PICKER_HEX_PLACEHOLDER}
              className="bg-background h-8 w-full rounded border px-2 font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={7}
            />
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
