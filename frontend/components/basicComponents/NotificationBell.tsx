// components/NotificationBell.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import { useNotifications } from '@/lib/notification-context';
import { Notification } from '@/types/notification';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNotificationClick = (n: Notification) => {
    if (!n.read_at) markAsRead(n.id);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center
                           w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900
                        rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700
                        z-50 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3
                          border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900
                                 text-blue-700 dark:text-blue-300 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400
                           hover:underline"
              >
                <CheckCheck className="w-3 h-3" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-100
                          dark:divide-gray-800">
            {loading && (
              <div className="py-8 text-center text-sm text-gray-400">Loading...</div>
            )}

            {!loading && notifications.length === 0 && (
              <div className="py-8 text-center">
                <Bell className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-400">No notifications yet</p>
              </div>
            )}

            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800
                            cursor-pointer transition-colors group
                            ${!n.read_at ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center
                                text-lg rounded-full bg-gray-100 dark:bg-gray-800">
                  {n.icon || '🔔'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium leading-tight
                                   ${!n.read_at
                                     ? 'text-gray-900 dark:text-white'
                                     : 'text-gray-600 dark:text-gray-400'}`}>
                      {n.title}
                    </p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100
                                    transition-opacity flex-shrink-0">
                      {n.link && (
                        <Link
                          href={n.link}
                          onClick={e => e.stopPropagation()}
                          className="p-1 hover:text-blue-600"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      <button
                        onClick={e => { e.stopPropagation(); deleteNotification(n.id); }}
                        className="p-1 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                    {n.body}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                  </p>
                </div>

                {/* Unread dot */}
                {!n.read_at && (
                  <div className="flex-shrink-0 mt-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}