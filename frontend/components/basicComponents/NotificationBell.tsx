"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Trash2, ExternalLink } from "lucide-react";
import { useNotifications } from "@/lib/notification-context";
import { Notification } from "@/types/notification";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { typeStyles } from '../../lib/constants/notificationTypeStyles';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotificationClick = (n: Notification) => {
    if (!n.read_at) markAsRead(n.id);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button — matches nav button style */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative p-2 rounded-md hover:bg-muted transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center
                           w-4 h-4 text-[10px] font-bold text-primary-foreground
                           bg-primary rounded-full"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-md border border-border
                        bg-background shadow-lg z-50 overflow-hidden"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-2.5
                          border-b border-border"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span
                  className="px-1.5 py-0.5 text-[10px] font-medium
                                 bg-primary text-primary-foreground rounded-full"
                >
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-muted-foreground
                           hover:text-foreground transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
            {loading && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Loading...
              </p>
            )}

            {!loading && notifications.length === 0 && (
              <div className="py-10 text-center">
                <Bell className="w-7 h-7 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No notifications yet
                </p>
              </div>
            )}

            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors group
                            hover:bg-muted
                            ${!n.read_at ? "bg-muted/50" : ""}`}
              >
                {/* Icon */}
                <div
                  className={`shrink-0 w-8 h-8 flex items-center justify-center
                 rounded-md ${typeStyles[n.type]?.bg ?? "bg-muted"}
                             ${typeStyles[n.type]?.color ?? "text-muted-foreground"}`}
                >
                  {typeStyles[n.type]?.icon ?? <Bell className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-sm font-medium leading-tight
                                   ${
                                     !n.read_at
                                       ? "text-foreground"
                                       : "text-muted-foreground"
                                   }`}
                    >
                      {n.title}
                    </p>

                    {/* Action buttons — visible on hover */}
                    <div
                      className="flex items-center gap-1 opacity-0 group-hover:opacity-100
                                    transition-opacity shrink-0"
                    >
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded hover:bg-muted text-muted-foreground
                                     hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        className="p-1 rounded hover:bg-muted text-muted-foreground
                                   hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {n.body}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {formatDistanceToNow(new Date(n.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                {/* Unread dot */}
                {!n.read_at && (
                  <div className="shrink-0 mt-2 w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
