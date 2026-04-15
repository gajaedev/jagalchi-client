'use client';

import { useCallback, useRef, useState } from 'react';

import { useReactFlow } from '@xyflow/react';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import { useAtomValue } from 'jotai';
import { jsPDF } from 'jspdf';
import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VIEWER_MESSAGES } from '@/constants/messages';
import type { RoadmapNode } from '@/types/roadmap.types';

import { viewerRoadmapAtom } from '../../stores/viewer-atoms';

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function getReactFlowElement(): HTMLElement | null {
  return document.querySelector('.react-flow') as HTMLElement | null;
}

function nodesToMarkdown(title: string, nodes: RoadmapNode[]): string {
  const lines: string[] = [`# ${title}`, '', '## Nodes', ''];

  for (const node of nodes) {
    const data = node.data;

    if (!('label' in data) || !data.label) continue;

    const label = String(data.label);
    const description = 'description' in data && data.description ? String(data.description) : '';
    const resources =
      'resources' in data && Array.isArray(data.resources) ? (data.resources as string[]) : [];

    const descPart = description ? `: ${description}` : '';
    lines.push(`- **${label}**${descPart}`);

    if (resources.length > 0) {
      lines.push(`  - Resources: ${resources.join(', ')}`);
    }
  }

  return lines.join('\n');
}

export function HeaderMenu() {
  const [isExporting, setIsExporting] = useState(false);
  const reactFlow = useReactFlow();
  const roadmap = useAtomValue(viewerRoadmapAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageExport = useCallback(
    async (format: 'png' | 'jpg' | 'svg') => {
      if (isExporting) return;
      const element = getReactFlowElement();
      if (!element) return;

      setIsExporting(true);
      try {
        const timestamp = Date.now();
        if (format === 'png') {
          const dataUrl = await toPng(element, { cacheBust: true });
          downloadDataUrl(dataUrl, `roadmap-${timestamp}.png`);
        } else if (format === 'jpg') {
          const dataUrl = await toJpeg(element, { cacheBust: true, quality: 0.95 });
          downloadDataUrl(dataUrl, `roadmap-${timestamp}.jpg`);
        } else {
          const dataUrl = await toSvg(element, { cacheBust: true });
          downloadDataUrl(dataUrl, `roadmap-${timestamp}.svg`);
        }
      } finally {
        setIsExporting(false);
      }
    },
    [isExporting],
  );

  const handleDataExport = useCallback(
    (format: 'json' | 'markdown') => {
      if (isExporting) return;

      const timestamp = Date.now();
      if (format === 'json') {
        const flowObject = reactFlow.toObject();
        const json = JSON.stringify(flowObject, null, 2);
        downloadBlob(json, `roadmap-${timestamp}.json`, 'application/json');
      } else {
        const title = roadmap?.title ?? 'Roadmap';
        const nodes = roadmap?.nodes ?? [];
        const markdown = nodesToMarkdown(title, nodes);
        downloadBlob(markdown, `roadmap-${timestamp}.md`, 'text/markdown');
      }
    },
    [isExporting, reactFlow, roadmap],
  );

  const handlePdfExport = useCallback(async () => {
    if (isExporting) return;
    const element = getReactFlowElement();
    if (!element) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      const isLandscape = img.width > img.height;
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'px',
        format: [img.width, img.height],
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
      pdf.save(`roadmap-${Date.now()}.pdf`);
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  const handleJsonImport = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          if (json.nodes && json.edges) {
            reactFlow.setNodes(json.nodes);
            reactFlow.setEdges(json.edges);
            if (json.viewport) {
              reactFlow.setViewport(json.viewport);
            }
          } else {
            alert(VIEWER_MESSAGES.IMPORT_JSON_INVALID);
          }
        } catch {
          alert(VIEWER_MESSAGES.IMPORT_JSON_INVALID);
        }
      };
      reader.readAsText(file);

      // Reset input so same file can be re-selected
      e.target.value = '';
    },
    [reactFlow],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[180px]">
        <DropdownMenuItem>{VIEWER_MESSAGES.MENU_STATISTICS}</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>{VIEWER_MESSAGES.MENU_EXPORT}</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleImageExport('png')}>
              {VIEWER_MESSAGES.IMAGE_PNG}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleImageExport('jpg')}>
              {VIEWER_MESSAGES.IMAGE_JPG}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleImageExport('svg')}>
              {VIEWER_MESSAGES.IMAGE_SVG}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePdfExport()}>
              {VIEWER_MESSAGES.EXPORT_PDF}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDataExport('markdown')}>
              {VIEWER_MESSAGES.EXPORT_MARKDOWN}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDataExport('json')}>
              {VIEWER_MESSAGES.EXPORT_JSON}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleJsonImport}>
          {VIEWER_MESSAGES.MENU_IMPORT_JSON}
        </DropdownMenuItem>
        <DropdownMenuItem>{VIEWER_MESSAGES.MENU_DARK_MODE}</DropdownMenuItem>
        <DropdownMenuItem>{VIEWER_MESSAGES.MENU_VERSION}</DropdownMenuItem>
      </DropdownMenuContent>

      {/* Hidden file input for JSON import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
    </DropdownMenu>
  );
}
