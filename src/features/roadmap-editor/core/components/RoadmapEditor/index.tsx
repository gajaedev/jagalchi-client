'use client';

import { ReactFlowProvider } from '@xyflow/react';

import { RoadmapCanvas } from '../../../canvas/components';
import { ColorPicker } from '../../../properties/components';
import { EditorSidebar } from '../../../sidebar/components';
import { EditorToolbar } from '../../../toolbar/components';
import { EditorHeader } from '../EditorHeader';

interface EditorContentProps {
  onBack?: () => void;
  roadmapId?: string;
}

function EditorContent({ onBack, roadmapId }: EditorContentProps) {
  return (
    <div className="relative flex h-screen w-screen">
      <EditorHeader onBack={onBack} />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex-1">
          <RoadmapCanvas roadmapId={roadmapId} />
        </div>
        <EditorSidebar />
      </div>

      <EditorToolbar />
      <ColorPicker />
    </div>
  );
}

interface RoadmapEditorProps {
  onBack?: () => void;
  roadmapId?: string;
}

export function RoadmapEditor({ onBack, roadmapId }: RoadmapEditorProps) {
  return (
    <ReactFlowProvider>
      <EditorContent onBack={onBack} roadmapId={roadmapId} />
    </ReactFlowProvider>
  );
}
