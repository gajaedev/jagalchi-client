import type { CommunityItem } from '../types/community.types';

export const MOCK_COMMUNITY_DATA: CommunityItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  title: i % 2 === 0 ? `Roadmap ${i + 1}` : `Guide ${i + 1}`,
  author: '홍길동',
  likes: (i * 7) % 100,
  updatedAt: new Date(2024, 0, 1, 12, 0, 0, i * 1000).toISOString(),
  type: i % 3 === 0 ? 'directory' : 'roadmap',
  size: (i * 3) % 20,
}));
