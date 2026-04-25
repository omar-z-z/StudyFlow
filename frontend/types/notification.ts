export type NotificationType = 'deadline' | 'task' | 'course' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  icon?: string;
  link?: string;
  read_at: string | null;
  created_at: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unread_count: number;
}