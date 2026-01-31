'use client';

import { use } from 'react';

import { RoadmapEditorPage } from '@/features/roadmap-editor/pages';

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const { id } = use(params);

  return <RoadmapEditorPage roadmapId={id} />;
}
