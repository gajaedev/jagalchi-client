'use client';

import { ReactFlowProvider } from '@xyflow/react';

import type { RoadmapNode } from '@/features/roadmap-editor/types/editor.types';

import { RoadmapCanvas } from '../../organisms/RoadmapCanvas';

import type { Edge } from '@xyflow/react';

interface RoadmapEditorProps {
  initialNodes?: RoadmapNode[];
  initialEdges?: Edge[];
}

export function RoadmapEditor({ initialNodes, initialEdges }: RoadmapEditorProps) {
  return (
    <ReactFlowProvider>
      <div className="relative h-screen w-screen">
        {/* Phase 2: 헤더 영역 (좌상단) */}
        {/* Phase 2: 툴바 영역 (하단 중앙) */}
        {/* Phase 2: 사이드바 영역 (우측) */}

        <RoadmapCanvas initialNodes={initialNodes} initialEdges={initialEdges} />
      </div>
    </ReactFlowProvider>
  );
}
