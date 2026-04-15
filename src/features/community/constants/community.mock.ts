import type { CommunityItem } from '../types/community.types';

export const MOCK_COMMUNITY_DATA: CommunityItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? `Roadmap ${i + 1}` : `Guide ${i + 1}`,
  author: '홍길동',
  likes: (i * 7) % 100,
  updatedAt: new Date(2024, 0, 1, 12, 0, 0, i * 1000).toISOString(),
  type: i % 3 === 0 ? 'directory' : 'roadmap',
  size: (i * 3) % 20,
  description: `이 로드맵은 ${i % 2 === 0 ? `Roadmap ${i + 1}` : `Guide ${i + 1}`} 학습 경로를 제공합니다. 단계별 커리큘럼과 실습 프로젝트를 통해 실무에 필요한 역량을 효과적으로 쌓을 수 있습니다.`,
}));
