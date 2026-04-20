'use client';

import { useCallback, useState } from 'react';

import { Image } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VIEWER_MESSAGES } from '@/constants/messages';
import { exportCanvasAsImage, type CanvasImageFormat } from '@/lib/export-canvas';

function getReactFlowElement(): HTMLElement | null {
  return document.querySelector('.react-flow') as HTMLElement | null;
}

export function HeaderSaveAsImageMenu() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(
    async (format: CanvasImageFormat) => {
      if (isExporting) return;

      const element = getReactFlowElement();
      if (!element) return;

      setIsExporting(true);
      try {
        const timestamp = Date.now();
        await exportCanvasAsImage(element, format, `roadmap-${timestamp}.${format}`);
      } finally {
        setIsExporting(false);
      }
    },
    [isExporting],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Image className="h-4 w-4" />
          <span className="ml-1.5">
            {isExporting ? VIEWER_MESSAGES.EXPORT_LOADING : VIEWER_MESSAGES.EXPORT_IMAGE_TITLE}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[160px]">
        <DropdownMenuItem onClick={() => handleExport('png')}>
          {VIEWER_MESSAGES.EXPORT_PNG}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('jpg')}>
          {VIEWER_MESSAGES.EXPORT_JPG}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('svg')}>
          {VIEWER_MESSAGES.EXPORT_SVG}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function handleSaveAsPng() {
  const element = getReactFlowElement();
  if (!element) return;
  void exportCanvasAsImage(element, 'png', `roadmap-${Date.now()}.png`);
}

export function handleSaveAsJpg() {
  const element = getReactFlowElement();
  if (!element) return;
  void exportCanvasAsImage(element, 'jpg', `roadmap-${Date.now()}.jpg`);
}

export function handleSaveAsSvg() {
  const element = getReactFlowElement();
  if (!element) return;
  void exportCanvasAsImage(element, 'svg', `roadmap-${Date.now()}.svg`);
}
