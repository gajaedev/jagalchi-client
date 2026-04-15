'use client';

import { useCallback, useState } from 'react';

import { useReactFlow } from '@xyflow/react';
import { useAtomValue } from 'jotai';
import { FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VIEWER_MESSAGES } from '@/constants/messages';
import type { RoadmapNode } from '@/types/roadmap.types';

import { viewerRoadmapAtom } from '../../stores/viewer-atoms';

type DataFormat = 'json' | 'markdown';

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * RoadmapNode 배열을 마크다운 아웃라인으로 변환한다.
 * section/text 노드는 제목 없이 스킵하고, label이 있는 노드만 포함한다.
 */
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

export function HeaderExportMenu() {
  const [isExporting, setIsExporting] = useState(false);
  const reactFlow = useReactFlow();
  const roadmap = useAtomValue(viewerRoadmapAtom);

  const handleExport = useCallback(
    async (format: DataFormat) => {
      if (isExporting) return;

      setIsExporting(true);
      try {
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
      } finally {
        setIsExporting(false);
      }
    },
    [isExporting, reactFlow, roadmap],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <FileDown className="h-4 w-4" />
          <span className="ml-1.5">
            {isExporting ? VIEWER_MESSAGES.EXPORT_LOADING : VIEWER_MESSAGES.EXPORT_DATA_TITLE}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[180px]">
        <DropdownMenuItem onClick={() => handleExport('json')}>
          {VIEWER_MESSAGES.EXPORT_JSON_DOWNLOAD}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('markdown')}>
          {VIEWER_MESSAGES.EXPORT_MARKDOWN_DOWNLOAD}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Kept for backward compatibility
export function handleExportMarkdown() {
  // no-op: use HeaderExportMenu component instead
}

export function handleExportPdf() {
  // no-op: PDF export not implemented
}

export function handleExportJson() {
  // no-op: use HeaderExportMenu component instead
}
