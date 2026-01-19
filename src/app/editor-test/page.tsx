'use client';

import {
  RoadmapEditor,
  createJagalchiNode,
  createJagalchiSection,
  createJagalchiText,
} from '@/features/roadmap-editor';

export default function EditorTestPage() {
  const initialNodes = [
    createJagalchiNode({ position: { x: 250, y: 100 }, variant: 'black', label: 'Node_1' }),
    createJagalchiSection({ position: { x: 100, y: 250 }, variant: 'blue', title: '섹션 1' }),
    createJagalchiText({ position: { x: 400, y: 250 }, variant: 'gray', content: '텍스트 라벨' }),
  ];

  const initialEdges = [
    {
      id: 'e1',
      source: initialNodes[0].id,
      target: initialNodes[2].id,
      label: 'Worse',
      type: 'smoothstep',
    },
  ];

  return <RoadmapEditor initialNodes={initialNodes} initialEdges={initialEdges} />;
}
