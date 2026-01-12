import type { CommunityItem } from '../types/community.types';

export const MOCK_COMMUNITY_DATA: CommunityItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  title: i % 2 === 0 ? `Roadmap ${i + 1}` : `Guide ${i + 1}`,
  author: '홍길동',
  likes: Math.floor(Math.random() * 100),
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  type: i % 3 === 0 ? 'directory' : 'roadmap',
  size: Math.floor(Math.random() * 20),
}));
