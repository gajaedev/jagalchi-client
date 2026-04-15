import { http, HttpResponse } from 'msw';

import { MOCK_USERS, findUserById } from '../fixtures/users';

import type { MockUser } from '../fixtures/users';

/** Mock 팔로우 관계 저장소 */
const followStore = new Map<string, Set<string>>();

/** Mock streak 데이터 생성 */
function generateMockStreak() {
  const activities: { date: string; count: number }[] = [];
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (Math.random() > 0.4) {
      activities.push({
        date: `${year}-${month}-${day}`,
        count: Math.floor(Math.random() * 5) + 1,
      });
    }
  }

  return { currentStreak: 12, activities };
}

function toQueryUserResponse(user: MockUser, isFollowed: boolean) {
  const externalLinks: Record<string, string> = {};
  user.links.forEach((link) => {
    externalLinks[link.name] = link.url;
  });

  return {
    user: {
      name: user.username,
      email: user.email,
      profileImageUrl: null,
      bio: user.bio ?? null,
      isFollowed,
      stats: { followersCount: 42, followingCount: 15 },
      externalLinks,
    },
    streak: generateMockStreak(),
  };
}

export const profileHandlers = [
  // GET /api/users?name={name} — 프로필 조회
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (!name) {
      return HttpResponse.json({ message: 'name parameter is required' }, { status: 400 });
    }

    if (name === 'nonexistent') {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 });
    }

    const user = MOCK_USERS.find((u) => u.username === name);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 });
    }

    const currentUserFollows = followStore.get('user-1') ?? new Set<string>();
    const isFollowed = currentUserFollows.has(user.id);

    return HttpResponse.json(toQueryUserResponse(user, isFollowed));
  }),

  // PATCH /api/users/profile — 프로필 수정
  http.patch('/api/users/profile', async ({ request }) => {
    const body = (await request.json()) as {
      user: { profileImage?: string; bio?: string; externalLinks?: Record<string, string> };
    };

    const user = findUserById('user-1');
    if (user) {
      if (body.user.bio !== undefined) user.bio = body.user.bio;
      if (body.user.externalLinks) {
        user.links = Object.entries(body.user.externalLinks).map(([name, url]) => ({ name, url }));
      }
    }

    return HttpResponse.json({ message: '프로필이 수정되었습니다' });
  }),

  // PATCH /api/users/{name}/follow — 팔로우 토글
  http.patch('/api/users/:name/follow', async ({ params, request }) => {
    const { name } = params as { name: string };
    const body = (await request.json()) as { toggle: boolean };

    const user = MOCK_USERS.find((u) => u.username === name);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 });
    }

    if (!followStore.has('user-1')) {
      followStore.set('user-1', new Set<string>());
    }
    const follows = followStore.get('user-1')!;

    if (body.toggle) {
      follows.add(user.id);
    } else {
      follows.delete(user.id);
    }

    return HttpResponse.json({ message: body.toggle ? '팔로우했습니다' : '언팔로우했습니다' });
  }),

  // GET /api/users/{name}/followers
  http.get('/api/users/:name/followers', ({ params }) => {
    const { name } = params as { name: string };
    const user = MOCK_USERS.find((u) => u.username === name);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 });
    }

    return HttpResponse.json({
      userId: Number(user.id.replace('user-', '')),
      type: 'FOLLOWERS',
      totalCount: 2,
      users: MOCK_USERS.filter((u) => u.id !== user.id)
        .slice(0, 2)
        .map((u) => ({
          id: Number(u.id.replace('user-', '')),
          name: u.username,
          profileImage: null,
          isFollowing: false,
        })),
    });
  }),

  // GET /api/users/{name}/followings
  http.get('/api/users/:name/followings', ({ params }) => {
    const { name } = params as { name: string };
    const user = MOCK_USERS.find((u) => u.username === name);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다' }, { status: 404 });
    }

    return HttpResponse.json({
      userId: Number(user.id.replace('user-', '')),
      type: 'FOLLOWINGS',
      totalCount: 1,
      users: MOCK_USERS.filter((u) => u.id !== user.id)
        .slice(0, 1)
        .map((u) => ({
          id: Number(u.id.replace('user-', '')),
          name: u.username,
          profileImage: null,
          isFollowing: true,
        })),
    });
  }),
];
