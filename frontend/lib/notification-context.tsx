'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';
import { Notification } from '@/types/notification';
import { apiFetch } from '@/lib/api';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  showToast: (notification: Pick<Notification, 'title' | 'body' | 'type' | 'link'>) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiFetch('/notifications');
      setNotifications(data.notifications);
      setUnreadCount(data.unread_count);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = async (id: string) => {
    await apiFetch(`/notifications/${id}/read`, {
      method: "PATCH",
    });
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    await apiFetch('/notifications/read-all', {method: "PATCH"});
    setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
    setUnreadCount(0);
  };

  const deleteNotification = async (id: string) => {
    await apiFetch(`/notifications/${id}`, {method: "DELETE"});
    const wasUnread = notifications.find(n => n.id === id)?.read_at === null;
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Show a Sonner toast + optionally add to the list
  const showToast = (notification: Pick<Notification, 'title' | 'body' | 'type' | 'link'>) => {
    const toastOptions = {
      description: notification.body,
      action: notification.link
        ? { label: 'View', onClick: () => window.location.href = notification.link! }
        : undefined,
    };

    switch (notification.type) {
      case 'deadline': toast.warning(notification.title, toastOptions); break;
      case 'task':     toast.success(notification.title, toastOptions); break;
      case 'course':   toast.info(notification.title, toastOptions);    break;
      default:         toast(notification.title, toastOptions);
    }
  };

  // Poll every 60 seconds for new notifications
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return (
    <NotificationContext.Provider value={{
      notifications, unreadCount, loading,
      fetchNotifications, markAsRead, markAllAsRead,
      deleteNotification, showToast,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used inside NotificationProvider');
  return ctx;
};