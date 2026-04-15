'use client';

import { useState } from 'react';

import { ReactFlowProvider } from '@xyflow/react';
import { useAtom, useAtomValue } from 'jotai';
import { LayoutGrid, Map, PanelRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { VIEWER_MESSAGES } from '@/constants/messages';

import { useViewerRoadmapLoader } from '../../hooks/use-viewer-roadmap-loader';
import {
  viewerErrorAtom,
  viewerLayoutAtom,
  viewerLoadingAtom,
  viewerSidebarOpenAtom,
} from '../../stores/viewer-atoms';
import { CardListMode } from '../CardListMode';
import { ForkTreeDialog } from '../ForkTreeDialog';
import { HeaderExportMenu } from '../HeaderExportMenu';
import { HeaderMenu } from '../HeaderMenu';
import { HeaderSaveAsImageMenu } from '../HeaderSaveAsImageMenu';
import { LearningCoachModal } from '../LearningCoachModal';
import { RoadmapHeader } from '../RoadmapHeader';
import { ViewerCanvas } from '../ViewerCanvas';
import { ViewerSidebar } from '../ViewerSidebar';
import { ViewerZoomControls } from '../ViewerZoomControls';

interface RoadmapViewerProps {
  roadmapId: string;
}

function ViewerContent({ roadmapId }: RoadmapViewerProps) {
  useViewerRoadmapLoader(roadmapId);

  const isLoading = useAtomValue(viewerLoadingAtom);
  const error = useAtomValue(viewerErrorAtom);
  const [layout, setLayout] = useAtom(viewerLayoutAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(viewerSidebarOpenAtom);
  const [isCoachOpen, setIsCoachOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">{VIEWER_MESSAGES.LOADING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{VIEWER_MESSAGES.ERROR_NOT_FOUND}</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <RoadmapHeader
        roadmapId={Number(roadmapId)}
        roadmapTitle={`Roadmap · ${roadmapId}`}
        onAiFeedback={() => setIsCoachOpen(true)}
      />

      <div className="mx-auto flex w-full max-w-[2011px] gap-4 px-4 py-4">
        <div className="relative flex-1">
          {/* Toolbar row */}
          <div className="mb-3 flex items-center gap-2">
            <HeaderMenu />
            <HeaderExportMenu />
            <HeaderSaveAsImageMenu />
            <ForkTreeDialog roadmapId={Number(roadmapId)} />
            <div className="ml-auto flex items-center gap-1">
              <Button
                variant={layout === 'page' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLayout('page')}
              >
                <Map className="mr-1.5 h-4 w-4" />
                {VIEWER_MESSAGES.VIEW_CANVAS}
              </Button>
              <Button
                variant={layout === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLayout('cards')}
              >
                <LayoutGrid className="mr-1.5 h-4 w-4" />
                {VIEWER_MESSAGES.VIEW_CARDS}
              </Button>
              {!isSidebarOpen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label={VIEWER_MESSAGES.SIDEBAR_OPEN_BUTTON_LABEL}
                >
                  <PanelRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Main content */}
          {layout === 'cards' ? <CardListMode /> : <ViewerCanvas />}
        </div>

        <ViewerSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          roadmapId={roadmapId}
        />
      </div>

      {layout === 'page' && <ViewerZoomControls />}

      <LearningCoachModal
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
        roadmapId={roadmapId}
      />
    </div>
  );
}

export function RoadmapViewer({ roadmapId }: RoadmapViewerProps) {
  return (
    <ReactFlowProvider>
      <ViewerContent roadmapId={roadmapId} />
    </ReactFlowProvider>
  );
}
