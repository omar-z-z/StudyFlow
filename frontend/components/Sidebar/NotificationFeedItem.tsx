'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Notification } from '@/types/notification';
import { typeStyles } from '../../lib/constants/notificationTypeStyles';

interface Props {
  notification: Notification;
  onDismiss: (id: string) => void;
  exiting: boolean;
}

export default function NotificationFeedItem({ notification, onDismiss, exiting }: Props) {
  const [mounted, setMounted] = useState(false);
  const style = typeStyles[notification.type] ?? typeStyles.system;
  const visible = mounted && !exiting;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        maxHeight:    exiting ? '0px' : '72px',
        opacity:      exiting ? 0 : 1,
        marginBottom: exiting ? '0px' : '4px',
        flexShrink:   0,
        overflow:     'hidden',
        transition:   'max-height 300ms ease, opacity 300ms ease, margin-bottom 300ms ease',
      }}
    >
      <div
        className="group flex items-start gap-2 px-3 py-2 rounded-md
                   border border-border/30 hover:bg-muted/70 cursor-default"
        style={{
          backgroundColor: 'hsl(var(--muted) / 0.35)',
          opacity:         visible ? 1 : 0,
          transform:       visible ? 'translateY(0)' : 'translateY(6px)',
          transition:      'opacity 280ms ease, transform 280ms ease',
        }}
      >
        <span className={`mt-0.5 shrink-0 ${style.color}`}>
          {style.icon}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground leading-tight truncate">
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {notification.body}
          </p>
        </div>

        <button
          onClick={() => onDismiss(notification.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity
                     text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}