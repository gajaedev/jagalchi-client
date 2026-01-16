'use client';

import { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { EDITOR_MESSAGES } from '@/constants/messages';
import { EditorHeader, EditorToolbar } from '@/features/editor';
import type { EditorToolbarMode, SaveStatus } from '@/features/editor';

export default function EditEditorPage() {
  const router = useRouter();
  const params = useParams();
  const roadmapId = params.id as string;

  const [roadmapTitle, setRoadmapTitle] = useState<string>('');
  const [saveStatus] = useState<SaveStatus>('default'); // TODO: Implement save functionality
  const [toolbarMode, setToolbarMode] = useState<EditorToolbarMode | null>(null);
  const [isAiDialogOpen, setAiDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // TODO: Replace with API call
    const loadRoadmap = async () => {
      try {
        setIsLoading(true);

        // Temporary: Load from localStorage
        const savedRoadmap = localStorage.getItem(`roadmap-${roadmapId}`);

        if (savedRoadmap) {
          const data = JSON.parse(savedRoadmap);
          setRoadmapTitle(data.title || '');
          // TODO: Load other roadmap data (nodes, edges, etc.)
        } else {
          setNotFound(true);
        }
      } catch {
        // TODO: Implement proper error handling
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (roadmapId) {
      loadRoadmap();
    }
  }, [roadmapId]);

  const handleBack = () => {
    router.push('/');
  };

  const handleModeChange = (mode: EditorToolbarMode) => {
    if (mode === 'ai') {
      setAiDialogOpen(true);
      setToolbarMode(null);
    } else {
      setToolbarMode(mode);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">{EDITOR_MESSAGES.PAGE_LOADING}</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{EDITOR_MESSAGES.PAGE_NOT_FOUND}</p>
        <button onClick={handleBack} className="text-primary hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <EditorHeader
        title={roadmapTitle || EDITOR_MESSAGES.PAGE_EDIT_TITLE}
        status={saveStatus}
        onTitleChange={setRoadmapTitle}
        onBack={handleBack}
      />

      <div className="relative flex flex-1">
        <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2">
          <EditorToolbar activeMode={toolbarMode} onModeChange={handleModeChange} />
        </div>

        {/* TODO: EditorCanvas (#55) */}
        <div className="flex-1 bg-gray-50">
          <div className="flex h-full items-center justify-center text-gray-400">
            TODO: EditorCanvas (#55)
          </div>
        </div>

        {/* TODO: DynamicSidebar (#57) */}
        {/* Placeholder for sidebars based on toolbarMode */}

        {/* TODO: AIDialog (#56) */}
        {isAiDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-6 shadow-xl">
              <p className="mb-4">TODO: AIDialog (#56)</p>
              <button
                onClick={() => setAiDialogOpen(false)}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
