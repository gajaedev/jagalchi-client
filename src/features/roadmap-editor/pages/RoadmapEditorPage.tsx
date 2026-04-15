'use client';

import { useAtomValue } from 'jotai';

import { UnsavedChangesDialog } from '../components/organisms/UnsavedChangesDialog';
import { RoadmapEditor } from '../core/components';
import { useAutoSave } from '../hooks/use-auto-save';
import { useRoadmapLoader } from '../hooks/use-roadmap-loader';
import { useUnsavedChanges } from '../hooks/use-unsaved-changes';
import { nodesAtom, edgesAtom, roadmapTitleAtom } from '../stores/editor-atoms';

import { ErrorFallback } from './ErrorFallback';
import { LoadingSkeleton } from './LoadingSkeleton';

interface RoadmapEditorPageProps {
  roadmapId: string;
}

export function RoadmapEditorPage({ roadmapId }: RoadmapEditorPageProps) {
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const title = useAtomValue(roadmapTitleAtom);

  // Load roadmap data
  const { isLoading, error, initialNodes, initialEdges, initialTitle, retry } = useRoadmapLoader({
    roadmapId,
  });

  // Handle unsaved changes
  const { showExitDialog, setShowExitDialog, handleBack, handleSaveAndExit, handleDiscardAndExit } =
    useUnsavedChanges({
      roadmapId,
      initialNodes,
      initialEdges,
      initialTitle,
      isLoading,
    });

  // Auto-save (debounced)
  useAutoSave({
    roadmapId,
    nodes,
    edges,
    title,
    isEnabled: !isLoading && !error,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorFallback error={error} onRetry={retry} />;
  }

  return (
    <>
      <RoadmapEditor onBack={handleBack} roadmapId={roadmapId} />

      <UnsavedChangesDialog
        isOpen={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onSave={handleSaveAndExit}
        onDiscard={handleDiscardAndExit}
      />
    </>
  );
}
