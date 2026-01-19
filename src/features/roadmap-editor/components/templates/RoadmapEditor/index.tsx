'use client';

import { ReactFlowProvider } from '@xyflow/react';
import { Provider as JotaiProvider } from 'jotai';

import { useLocalStorage } from '@/features/roadmap-editor/hooks/use-local-storage';

import { ColorPicker } from '../../molecules/ColorPicker';
import { EditorHeader } from '../../organisms/EditorHeader';
import { EditorSidebar } from '../../organisms/EditorSidebar';
import { EditorToolbar } from '../../organisms/EditorToolbar';
import { RoadmapCanvas } from '../../organisms/RoadmapCanvas';

function EditorContent() {
  useLocalStorage();

  return (
    <div className="flex h-screen w-screen flex-col">
      <EditorHeader />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex-1">
          <RoadmapCanvas />
        </div>
        <EditorSidebar />
      </div>

      <EditorToolbar />
      <ColorPicker />
    </div>
  );
}

export function RoadmapEditor() {
  return (
    <JotaiProvider>
      <ReactFlowProvider>
        <EditorContent />
      </ReactFlowProvider>
    </JotaiProvider>
  );
}
