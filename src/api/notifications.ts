import { apiClient } from './client';

// === Types ===

export interface NotificationResponse {
  id: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedId?: number | null;
}

interface PageableResponse {
  pageNumber: number;
  pageSize: number;
}

export interface NotificationListResponse {
  content: NotificationResponse[];
  pageable: PageableResponse;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface NotificationSettingResponse {
  type: string;
  isEnabled: boolean;
}

export interface NotificationListParams {
  page?: number;
  size?: number;
}

// === API Functions ===

export const getNotifications = (
  params?: NotificationListParams,
): Promise<NotificationListResponse> => {
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.set('page', String(params.page));
  if (params?.size !== undefined) searchParams.set('size', String(params.size));
  const query = searchParams.toString();
  return apiClient.get<NotificationListResponse>(`/notifications${query ? `?${query}` : ''}`);
};

export const markNotificationRead = (notificationId: number): Promise<void> =>
  apiClient.patch<void>(`/notifications/${notificationId}/read`);

export const markAllNotificationsRead = (): Promise<number> =>
  apiClient.patch<number>('/notifications/read-all');

export const getNotificationSettings = (): Promise<NotificationSettingResponse[]> =>
  apiClient.get<NotificationSettingResponse[]>('/notifications/settings');
