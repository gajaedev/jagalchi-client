import type { Roadmap, RoadmapNode } from '@/types/roadmap.types';

import type { Edge } from '@xyflow/react';

/**
 * Mock roadmap fixture data for MSW handlers
 * 실제 Roadmap 타입과 일치하는 데이터
 */

const MOCK_NODES_FRONTEND: RoadmapNode[] = [
  {
    id: 'node-1',
    type: 'jagalchi-node',
    position: { x: 250, y: 0 },
    data: {
      label: 'HTML/CSS 기초',
      description: '웹 개발의 기본이 되는 HTML과 CSS를 학습합니다',
      resources: ['https://developer.mozilla.org/ko/docs/Web/HTML'],
      variant: 'blue',
      isLocked: false,
    },
  },
  {
    id: 'node-2',
    type: 'jagalchi-node',
    position: { x: 250, y: 150 },
    data: {
      label: 'JavaScript',
      description: '프로그래밍 언어 JavaScript의 핵심 개념을 학습합니다',
      resources: ['https://javascript.info/'],
      variant: 'orange',
      isLocked: false,
    },
  },
  {
    id: 'node-3',
    type: 'jagalchi-node',
    position: { x: 250, y: 300 },
    data: {
      label: 'React',
      description: 'React 라이브러리를 활용한 SPA 개발을 학습합니다',
      resources: ['https://react.dev/'],
      variant: 'purple',
      isLocked: false,
    },
  },
  {
    id: 'section-1',
    type: 'jagalchi-section',
    position: { x: 200, y: -50 },
    data: {
      title: '프론트엔드 기초',
      variant: 'white',
      isLocked: false,
    },
    style: { width: 300, height: 500 },
  },
  {
    id: 'text-1',
    type: 'jagalchi-text',
    position: { x: 600, y: 100 },
    data: {
      content: '순서대로 학습하세요!',
      variant: 'black',
      fontSize: 14,
      fontWeight: 'normal',
      isLocked: false,
    },
  },
];

const MOCK_EDGES_FRONTEND: Edge[] = [
  { id: 'edge-1-2', source: 'node-1', target: 'node-2' },
  { id: 'edge-2-3', source: 'node-2', target: 'node-3' },
];

const MOCK_NODES_BACKEND: RoadmapNode[] = [
  {
    id: 'node-b1',
    type: 'jagalchi-node',
    position: { x: 250, y: 0 },
    data: {
      label: 'Python 기초',
      description: 'Python 프로그래밍 언어의 기본 문법을 학습합니다',
      resources: ['https://docs.python.org/ko/3/'],
      variant: 'blue',
      isLocked: false,
    },
  },
  {
    id: 'node-b2',
    type: 'jagalchi-node',
    position: { x: 250, y: 150 },
    data: {
      label: 'Django',
      description: 'Django 웹 프레임워크를 학습합니다',
      resources: ['https://docs.djangoproject.com/ko/'],
      variant: 'purple',
      isLocked: false,
    },
  },
];

const MOCK_EDGES_BACKEND: Edge[] = [{ id: 'edge-b1-b2', source: 'node-b1', target: 'node-b2' }];

export const MOCK_ROADMAPS: Roadmap[] = [
  {
    id: 1,
    title: '프론트엔드 개발자 로드맵',
    description: 'HTML/CSS부터 React까지 프론트엔드 개발의 학습 경로입니다',
    nodes: MOCK_NODES_FRONTEND,
    edges: MOCK_EDGES_FRONTEND,
    author: { id: 1, name: '김선배' },
    isPublic: true,
    createdAt: '2025-07-01T10:00:00.000Z',
    updatedAt: '2025-12-15T14:30:00.000Z',
  },
  {
    id: 2,
    title: '백엔드 개발자 로드맵',
    description: 'Python과 Django를 활용한 백엔드 개발 학습 경로입니다',
    nodes: MOCK_NODES_BACKEND,
    edges: MOCK_EDGES_BACKEND,
    author: { id: 3, name: '이멘토' },
    isPublic: true,
    createdAt: '2025-08-15T11:00:00.000Z',
    updatedAt: '2025-11-20T09:00:00.000Z',
  },
  {
    id: 3,
    title: '나의 학습 노트',
    description: '개인 학습 기록용 비공개 로드맵',
    nodes: [],
    edges: [],
    author: { id: 2, name: '박후배' },
    isPublic: false,
    createdAt: '2025-10-01T08:00:00.000Z',
    updatedAt: '2025-10-01T08:00:00.000Z',
  },
];

/** ID로 로드맵 검색 */
export const findRoadmapById = (id: number): Roadmap | undefined =>
  MOCK_ROADMAPS.find((roadmap) => roadmap.id === id);
