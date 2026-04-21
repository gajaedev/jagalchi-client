'use client';

import { use } from 'react';

import dynamic from 'next/dynamic';

import { LoadingSkeleton } from '@/features/roadmap-editor/pages';

// xyflow (@xyflow/react) 은 SSR 미지원 — dynamic import로 클라이언트 전용 로드
const RoadmapEditorPage = dynamic(
  () => import('@/features/roadmap-editor/pages').then((m) => ({ default: m.RoadmapEditorPage })),
  { ssr: false, loading: () => <LoadingSkeleton /> },
);

interface EditorPageProps {
  params: Promise<{ id: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const { id } = use(params);

  return <RoadmapEditorPage roadmapId={id} />;
}
