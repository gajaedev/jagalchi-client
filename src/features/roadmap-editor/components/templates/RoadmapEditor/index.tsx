'use client';

import { ReactFlowProvider } from '@xyflow/react';
import { Provider as JotaiProvider } from 'jotai';

import { useInitialNode } from '@/features/roadmap-editor/hooks/use-initial-node';
import { useLocalStorage } from '@/features/roadmap-editor/hooks/use-local-storage';

import { ColorPicker } from '../../molecules/ColorPicker';
import { EditorHeader } from '../../organisms/EditorHeader';
import { EditorSidebar } from '../../organisms/EditorSidebar';
import { EditorToolbar } from '../../organisms/EditorToolbar';
import { RoadmapCanvas } from '../../organisms/RoadmapCanvas';

function EditorContent() {
  useLocalStorage();
  useInitialNode();

  // Placeholder tools until toolbar integration is complete
  const placeholderTools = [
    {
      id: 'select',
      icon: <div className="h-5 w-5" />,
      label: 'Select',
      isActive: true,
      onClick: () => {},
    },
    {
      id: 'node',
      icon: <div className="h-5 w-5" />,
      label: 'Add Node',
      onClick: () => {},
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-col">
      <EditorHeader />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex-1">
          <RoadmapCanvas />
        </div>
        <EditorSidebar>
          <div className="text-sm text-neutral-700">
            Properties panel will appear here when a node is selected.
          </div>
        </EditorSidebar>
      </div>

      <EditorToolbar tools={placeholderTools} />
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
