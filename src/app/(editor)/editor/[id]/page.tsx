'use client';

import { RoadmapEditorPage } from '@/features/roadmap-editor/pages/RoadmapEditorPage';

interface EditorPageProps {
  params: {
    id: string;
  };
}

export default function EditorPage({ params }: EditorPageProps) {
  return <RoadmapEditorPage roadmapId={params.id} />;
}
