"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
} from "react";
import { toast } from "sonner";
import { Notification } from "@/types/notification";
import { apiFetch } from "@/lib/api";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  showToast: (
    notification: Pick<Notification, "title" | "body" | "type" | "link">,
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // In notification-context.tsx
  const isFirstLoad = useRef(true);

  const fetchNotifications = useCallback(async () => {
    if (isFirstLoad.current) setLoading(true);
    try {
      const data = await apiFetch("/notifications");
      setNotifications(data.notifications ?? []);
      setUnreadCount(data.unread_count ?? 0);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
  }, []);

  const markAsRead = async (id: string) => {
    await apiFetch(`/notifications/${id}/read`, {
      method: "PATCH",
    });
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    await apiFetch("/notifications/read-all", { method: "PATCH" });
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read_at: new Date().toISOString() })),
    );
    setUnreadCount(0);
  };

  const deleteNotification = async (id: string) => {
    await apiFetch(`/notifications/${id}`, { method: "DELETE" });
    const wasUnread = notifications.find((n) => n.id === id)?.read_at === null;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    if (wasUnread) setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  // Show a Sonner toast + optionally add to the list
  const showToast = (
    notification: Pick<Notification, "title" | "body" | "type" | "link">,
  ) => {
    const toastOptions = {
      description: notification.body,
      action: notification.link
        ? {
            label: "View",
            onClick: () => (window.location.href = notification.link!),
          }
        : undefined,
    };

    switch (notification.type) {
      case "deadline":
        toast.warning(notification.title, toastOptions);
        break;
      case "task":
        toast.success(notification.title, toastOptions);
        break;
      case "course":
        toast.info(notification.title, toastOptions);
        break;
      default:
        toast(notification.title, toastOptions);
    }
    fetchNotifications();
  };

  // // Poll every 60 seconds for new notifications
  // useEffect(() => {
  //   fetchNotifications();
  //   const interval = setInterval(fetchNotifications, 60_000);
  //   return () => clearInterval(interval);
  // }, [fetchNotifications]);
  // In notification-context.tsx — replace the useEffect

  useEffect(() => {
    fetchNotifications(); // initial load

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("studyflow_token");
    if (!token) return;

    let active = true;
    const controller = new AbortController();

    const startStream = async () => {
      try {
        const res = await fetch(`${BASE_URL}/notifications/stream`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/event-stream",
          },
          signal: controller.signal,
        });

        if (!res.ok || !res.body) return;

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (active) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? ""; // keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                setNotifications(data.notifications);
                setUnreadCount(data.unread_count);
              } catch {
                // malformed line, skip
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("SSE stream error:", err);
        }
      }
    };

    startStream();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        showToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  return ctx;
};
