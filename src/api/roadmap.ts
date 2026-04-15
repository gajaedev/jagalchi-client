import { apiClient } from './client';

// === Common Types ===

interface RoadmapOwnerResponse {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface RoadmapStatsResponse {
  totalNodes: number;
  totalEdges: number;
  forkCount: number;
}

interface PageableResponse {
  pageNumber: number;
  pageSize: number;
}

// === Roadmap Types (aligned with Roadmap Service OpenAPI spec) ===

interface CreateRoadmapRequest {
  title: string;
  description?: string;
  directoryId?: number;
  isPublic?: boolean;
  thumbnailUrl?: string;
  tags?: string[];
}

interface UpdateRoadmapRequest {
  title?: string;
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
  tags?: string[];
}

interface RoadmapResponse {
  id: number;
  title: string;
  description: string | null;
  directoryId: number | null;
  ownerId: number;
  isPublic: boolean;
  viewCount: number;
  forkCount: number;
  createdAt: string;
  updatedAt: string;
}

interface RoadmapDetailResponse {
  id: number;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  isPublic: boolean;
  viewCount: number;
  owner: RoadmapOwnerResponse;
  stats: RoadmapStatsResponse;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface RoadmapListItemResponse {
  id: number;
  title: string;
  tags: string[];
  owner: RoadmapOwnerResponse;
}

interface RoadmapListResponse {
  content: RoadmapListItemResponse[];
  pageable: PageableResponse;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

interface RoadmapUpdateResponse {
  id: number;
  updatedAt: string;
}

interface RoadmapDeleteResponse {
  message: string;
}

// === Directory Types ===

interface DirectoryResponse {
  id: number;
  name: string;
  parentId: number | null;
  path: string;
  createdAt: string;
}

interface RoadmapSummaryResponse {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  isPublic: boolean;
  updatedAt: string;
}

interface DirectoryTreeItem {
  id: number;
  name: string;
  path: string;
  roadmaps: RoadmapSummaryResponse[];
}

type DirectoryTreeResponse = DirectoryTreeItem[];

// === Progress Types ===

interface ProgressResponse {
  roadmapId: number;
  totalNodes: number;
  completedNodes: number;
  progressPercentage: number;
  completedNodeIds: number[];
  updatedAt: string;
}

interface NodeCompleteResponse {
  nodeId: number;
  isCompleted: boolean;
  roadmapProgress: number;
  completedAt: string | null;
}

// === Event Types (Event Service — roadmapId is string) ===

interface RoadmapEvent {
  type: 'SNAPSHOT' | 'ACK' | 'EVENT' | 'PRESENCE';
  eventId: string;
  sequence: number;
  payload: Record<string, unknown>;
}

// === Fork Types ===

interface RoadmapForkTreeResponse {
  id: number;
  title: string;
  ownerId: number;
  ownerName: string;
  forkCount: number;
  children: RoadmapForkTreeResponse[];
}

interface RoadmapForkStatusResponse {
  roadmapId: number;
  forkCount: number;
  originalRoadmapId: number | null;
  originalRoadmapTitle: string | null;
  forkedByCurrentUser: boolean;
}

// === Like Types ===

interface RoadmapLikeStatusResponse {
  roadmapId: number;
  likeCount: number;
  likedByCurrentUser: boolean;
}

// === Favorite Types ===

interface RoadmapFavoriteStatusResponse {
  roadmapId: number;
  favoriteCount: number;
  favoritedByCurrentUser: boolean;
}

// === Notification Types ===

type NotificationType = 'FORK' | 'FOLLOW' | 'STUDY' | 'COMMENT' | 'SYSTEM';

interface NotificationResponse {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  referenceId: number;
  isRead: boolean;
  createdAt: string;
}

interface NotificationListResponse {
  notifications: NotificationResponse[];
  totalCount: number;
  unreadCount: number;
  page: number;
  size: number;
}

interface NotificationSettingResponse {
  type: NotificationType;
  isEnabled: boolean;
}

// === Roadmap CRUD ===

export const createRoadmap = (data: CreateRoadmapRequest) =>
  apiClient.post<RoadmapResponse>('/roadmaps', data);

export const getRoadmap = (roadmapId: number) =>
  apiClient.get<RoadmapDetailResponse>(`/roadmaps/${roadmapId}`);

interface RoadmapListParams {
  page?: number;
  size?: number;
  sort?: string;
  period?: string;
  query?: string;
  userId?: number;
  directoryId?: number;
  isPublic?: boolean;
  tags?: string[];
}

export const getRoadmaps = (params: RoadmapListParams = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.period) searchParams.set('period', params.period);
  if (params.query) searchParams.set('query', params.query);
  if (params.userId !== undefined) searchParams.set('userId', String(params.userId));
  if (params.directoryId !== undefined) searchParams.set('directoryId', String(params.directoryId));
  if (params.isPublic !== undefined) searchParams.set('isPublic', String(params.isPublic));
  if (params.tags?.length) params.tags.forEach((tag) => searchParams.append('tags', tag));

  const qs = searchParams.toString();
  return apiClient.get<RoadmapListResponse>(`/roadmaps${qs ? `?${qs}` : ''}`);
};

export const updateRoadmap = (roadmapId: number, data: UpdateRoadmapRequest) =>
  apiClient.patch<RoadmapUpdateResponse>(`/roadmaps/${roadmapId}`, data);

export const deleteRoadmap = (roadmapId: number) =>
  apiClient.delete<RoadmapDeleteResponse>(`/roadmaps/${roadmapId}`);

// === Directory ===

export const getDirectoryTree = () => apiClient.get<DirectoryTreeResponse>('/directories/tree');

export const createDirectory = (data: { name: string; parentId?: number }) =>
  apiClient.post<DirectoryResponse>('/directories', data);

export const updateDirectory = (directoryId: number, data: { name: string }) =>
  apiClient.patch<DirectoryResponse>(`/directories/${directoryId}`, data);

interface DeleteDirectoryParams {
  mode?: string;
  targetDirectoryId?: number;
}

export const deleteDirectory = (directoryId: number, params?: DeleteDirectoryParams) => {
  const searchParams = new URLSearchParams();
  if (params?.mode) searchParams.set('mode', params.mode);
  if (params?.targetDirectoryId !== undefined)
    searchParams.set('targetDirectoryId', String(params.targetDirectoryId));

  const qs = searchParams.toString();
  return apiClient.delete<Record<string, string>>(
    `/directories/${directoryId}${qs ? `?${qs}` : ''}`,
  );
};

// === Progress ===

export const getMyProgress = (roadmapId: number) =>
  apiClient.get<ProgressResponse>(`/roadmaps/${roadmapId}/my-progress`);

export const getUserProgress = (roadmapId: number, userId: number) =>
  apiClient.get<ProgressResponse>(`/roadmaps/${roadmapId}/users/${userId}/progress`);

export const completeNode = (
  roadmapId: number,
  nodeId: number,
  data: { isCompleted: boolean; link?: string },
) => apiClient.post<NodeCompleteResponse>(`/roadmaps/${roadmapId}/nodes/${nodeId}/complete`, data);

// === Events (Event Service — roadmapId is string per spec) ===

export const getRoadmapEvents = (roadmapId: string, since = 0) =>
  apiClient.get<RoadmapEvent[]>(`/roadmap/${roadmapId}/events?since=${since}`);

// === Fork ===

export const forkRoadmap = (roadmapId: number) =>
  apiClient.post<RoadmapResponse>(`/roadmaps/${roadmapId}/fork`);

export const getForkTree = (roadmapId: number) =>
  apiClient.get<RoadmapForkTreeResponse>(`/roadmaps/${roadmapId}/fork-tree`);

export const getForkStatus = (roadmapId: number) =>
  apiClient.get<RoadmapForkStatusResponse>(`/roadmaps/${roadmapId}/fork-status`);

// === Popular ===

interface PopularRoadmapsParams {
  page?: number;
  size?: number;
  sortBy?: string;
}

export const getPopularRoadmaps = (params: PopularRoadmapsParams = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);

  const qs = searchParams.toString();
  return apiClient.get<RoadmapListResponse>(`/roadmaps/popular${qs ? `?${qs}` : ''}`);
};

// === Likes ===

export const likeRoadmap = (roadmapId: number) =>
  apiClient.post<RoadmapLikeStatusResponse>(`/roadmaps/${roadmapId}/likes`);

export const unlikeRoadmap = (roadmapId: number) =>
  apiClient.delete<RoadmapDeleteResponse>(`/roadmaps/${roadmapId}/likes`);

export const getLikeStatus = (roadmapId: number) =>
  apiClient.get<RoadmapLikeStatusResponse>(`/roadmaps/${roadmapId}/like-status`);

export const getLikedRoadmaps = (params: { page?: number; size?: number } = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));

  const qs = searchParams.toString();
  return apiClient.get<RoadmapListResponse>(`/roadmaps/liked${qs ? `?${qs}` : ''}`);
};

// === Favorites ===

export const favoriteRoadmap = (roadmapId: number) =>
  apiClient.post<RoadmapFavoriteStatusResponse>(`/roadmaps/${roadmapId}/favorites`);

export const unfavoriteRoadmap = (roadmapId: number) =>
  apiClient.delete<RoadmapDeleteResponse>(`/roadmaps/${roadmapId}/favorites`);

export const getFavoriteStatus = (roadmapId: number) =>
  apiClient.get<RoadmapFavoriteStatusResponse>(`/roadmaps/${roadmapId}/favorite-status`);

export const getFavoritedRoadmaps = (params: { page?: number; size?: number } = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));

  const qs = searchParams.toString();
  return apiClient.get<RoadmapListResponse>(`/roadmaps/favorited${qs ? `?${qs}` : ''}`);
};

// === Notifications ===

interface NotificationListParams {
  page?: number;
  size?: number;
  unreadOnly?: boolean;
  type?: NotificationType;
}

export const getNotifications = (params: NotificationListParams = {}) => {
  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));
  if (params.unreadOnly !== undefined) searchParams.set('unreadOnly', String(params.unreadOnly));
  if (params.type) searchParams.set('type', params.type);

  const qs = searchParams.toString();
  return apiClient.get<NotificationListResponse>(`/notifications${qs ? `?${qs}` : ''}`);
};

export const markNotificationAsRead = (notificationId: number) =>
  apiClient.patch<void>(`/notifications/${notificationId}/read`);

export const markAllNotificationsAsRead = () => apiClient.patch<number>('/notifications/read-all');

export const getNotificationSettings = () =>
  apiClient.get<NotificationSettingResponse[]>('/notifications/settings');

export const updateNotificationSetting = (type: NotificationType, enabled: boolean) => {
  const searchParams = new URLSearchParams();
  searchParams.set('type', type);
  searchParams.set('enabled', String(enabled));
  return apiClient.post<void>(`/notifications/settings?${searchParams.toString()}`);
};

// === Type Exports ===

export type {
  RoadmapOwnerResponse,
  RoadmapStatsResponse,
  PageableResponse,
  CreateRoadmapRequest,
  UpdateRoadmapRequest,
  RoadmapResponse,
  RoadmapDetailResponse,
  RoadmapListItemResponse,
  RoadmapListResponse,
  RoadmapListParams,
  RoadmapUpdateResponse,
  RoadmapDeleteResponse,
  DirectoryResponse,
  RoadmapSummaryResponse,
  DirectoryTreeItem,
  DirectoryTreeResponse,
  ProgressResponse,
  NodeCompleteResponse,
  RoadmapEvent,
  RoadmapForkTreeResponse,
  RoadmapForkStatusResponse,
  PopularRoadmapsParams,
  RoadmapLikeStatusResponse,
  RoadmapFavoriteStatusResponse,
  NotificationType,
  NotificationResponse,
  NotificationListResponse,
  NotificationListParams,
  NotificationSettingResponse,
  DeleteDirectoryParams,
};
