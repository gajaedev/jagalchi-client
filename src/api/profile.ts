import { apiClient } from './client';

// === Request Types (aligned with docs/api.md) ===

interface UpdateProfileRequest {
  user: {
    profileImage?: string;
    bio?: string;
    externalLinks?: Record<string, string>;
  };
}

interface FollowToggleRequest {
  toggle: boolean;
}

// === Response Types ===

interface UserStats {
  followersCount: number;
  followingCount: number;
}

interface QueryUserDto {
  name: string;
  email: string;
  profileImageUrl: string | null;
  bio: string | null;
  isFollowed: boolean;
  stats: UserStats;
  externalLinks: Record<string, string>;
}

interface StreakActivity {
  date: string;
  count: number;
}

interface StreakResponseDto {
  currentStreak: number;
  activities: StreakActivity[];
}

interface QueryUserResponse {
  user: QueryUserDto;
  streak: StreakResponseDto;
}

interface MessageResponse {
  message: string;
}

interface FollowUserResponse {
  id: number;
  name: string;
  profileImage: string | null;
  isFollowing: boolean;
}

interface FollowListResponse {
  userId: number;
  type: 'FOLLOWERS' | 'FOLLOWINGS';
  totalCount: number;
  users: FollowUserResponse[];
}

// === API Functions ===

/** GET /users?name={name} — 사용자 프로필 조회 */
export const getProfile = (name: string) =>
  apiClient.get<QueryUserResponse>(`/users?name=${encodeURIComponent(name)}`);

/** PATCH /users/profile — 프로필 수정 */
export const updateProfile = (data: UpdateProfileRequest) =>
  apiClient.patch<MessageResponse>('/users/profile', data);

/** PATCH /users/{name}/follow — 팔로우 토글 */
export const toggleFollow = (name: string, data: FollowToggleRequest) =>
  apiClient.patch<void>(`/users/${encodeURIComponent(name)}/follow`, data);

/** GET /users/{name}/followers — 팔로워 목록 */
export const getFollowers = (name: string) =>
  apiClient.get<FollowListResponse>(`/users/${encodeURIComponent(name)}/followers`);

/** GET /users/{name}/followings — 팔로잉 목록 */
export const getFollowings = (name: string) =>
  apiClient.get<FollowListResponse>(`/users/${encodeURIComponent(name)}/followings`);

// === Type Exports ===

export type {
  UpdateProfileRequest,
  FollowToggleRequest,
  QueryUserDto,
  QueryUserResponse,
  StreakResponseDto,
  StreakActivity,
  FollowUserResponse,
  FollowListResponse,
};
