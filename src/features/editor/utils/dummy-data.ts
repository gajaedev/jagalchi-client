import type { Node, Edge } from '@xyflow/react';

/**
 * AI로부터 생성된 것처럼 보이는 더미 로드맵 데이터 생성
 * @param prompt - 사용자 프롬프트 (노드 이름 추출용)
 */
export function generateDummyRoadmap(prompt: string): {
  nodes: Node[];
  edges: Edge[];
} {
  // 프롬프트에서 키워드 추출 (간단한 로직)
  const keywords = prompt
    .split(' ')
    .filter((word) => word.length > 2)
    .slice(0, 5);

  // 노드 생성
  const nodes: Node[] = keywords.map((keyword, i) => ({
    id: `node-${i + 1}`,
    type: 'custom-node',
    position: { x: 250 * (i % 3), y: 150 * Math.floor(i / 3) },
    data: {
      title: `${keyword}_${i + 1}`,
      description: `${keyword}에 대한 설명`,
      color: ['#000000', '#3B82F6', '#8B5CF6', '#EF4444', '#F97316'][i % 5],
      resources: [],
      isLocked: false,
    },
  }));

  // 엣지 생성 (순차 연결)
  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `edge-${i + 1}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      type: 'custom-edge',
      data: {
        style: 'solid',
        color: '#000000',
        label: '',
      },
    });
  }

  return { nodes, edges };
}

/**
 * 기본 빈 로드맵 생성
 */
export function generateEmptyRoadmap(): {
  nodes: Node[];
  edges: Edge[];
} {
  return {
    nodes: [],
    edges: [],
  };
}
