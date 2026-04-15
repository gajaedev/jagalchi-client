'use client';

import { useCallback, useState } from 'react';

import { toJpeg, toPng, toSvg } from 'html-to-image';
import { Image } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VIEWER_MESSAGES } from '@/constants/messages';

type ImageFormat = 'png' | 'jpg' | 'svg';

/**
 * ReactFlow 캔버스를 이미지 파일로 다운로드하는 유틸리티
 * html-to-image는 filter 함수로 불필요한 컨트롤 요소를 제외한다
 */
function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function getReactFlowElement(): HTMLElement | null {
  return document.querySelector('.react-flow') as HTMLElement | null;
}

export function HeaderSaveAsImageMenu() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(
    async (format: ImageFormat) => {
      if (isExporting) return;

      const element = getReactFlowElement();
      if (!element) return;

      setIsExporting(true);
      try {
        const timestamp = Date.now();
        const filename = `roadmap-${timestamp}.${format}`;

        if (format === 'png') {
          const dataUrl = await toPng(element, { cacheBust: true });
          downloadDataUrl(dataUrl, filename);
        } else if (format === 'jpg') {
          const dataUrl = await toJpeg(element, { cacheBust: true, quality: 0.95 });
          downloadDataUrl(dataUrl, filename);
        } else {
          const dataUrl = await toSvg(element, { cacheBust: true });
          downloadDataUrl(dataUrl, filename);
        }
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

// Kept for backward compatibility (used by HeaderMenu submenu items)
export function handleSaveAsPng() {
  const element = getReactFlowElement();
  if (!element) return;
  toPng(element, { cacheBust: true }).then((dataUrl) => {
    downloadDataUrl(dataUrl, `roadmap-${Date.now()}.png`);
  });
}

export function handleSaveAsJpg() {
  const element = getReactFlowElement();
  if (!element) return;
  toJpeg(element, { cacheBust: true, quality: 0.95 }).then((dataUrl) => {
    downloadDataUrl(dataUrl, `roadmap-${Date.now()}.jpg`);
  });
}

export function handleSaveAsSvg() {
  const element = getReactFlowElement();
  if (!element) return;
  toSvg(element, { cacheBust: true }).then((dataUrl) => {
    downloadDataUrl(dataUrl, `roadmap-${Date.now()}.svg`);
  });
}
