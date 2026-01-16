'use client';

import { useParams, notFound } from 'next/navigation';

import { EDITOR_MESSAGES } from '@/constants/messages';
import {
  EditorTemplate,
  EditorHeader,
  EditorToolbar,
  EditorCanvas,
  DynamicSidebar,
  AIDialog,
} from '@/features/editor';
import { useEditorPage } from '@/features/editor/hooks';

export default function EditorPage() {
  const params = useParams();
  const roadmapId = params.id as string;

  const {
    toolbarMode,
    setToolbarMode,
    isAiDialogOpen,
    setIsAiDialogOpen,
    aiAction,
    isLoading,
    isNotFound,
    handleAIAction,
    handleGenerate,
  } = useEditorPage({ roadmapId });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">{EDITOR_MESSAGES.PAGE_LOADING}</p>
      </div>
    );
  }

  if (isNotFound) {
    notFound();
  }

  return (
    <>
      <EditorTemplate
        header={<EditorHeader />}
        toolbar={
          <EditorToolbar
            activeMode={toolbarMode}
            onModeChange={setToolbarMode}
            onAIAction={handleAIAction}
          />
        }
        sidebar={<DynamicSidebar />}
      >
        <EditorCanvas />
      </EditorTemplate>

      <AIDialog
        isOpen={isAiDialogOpen}
        onOpenChange={setIsAiDialogOpen}
        initialAction={aiAction}
        onGenerate={handleGenerate}
      />
    </>
  );
}
