'use client';

import { useEffect, useRef, useState } from 'react';
import { useNotifications } from '@/lib/notification-context';
import NotificationFeedItem from './NotificationFeedItem';

export default function SidebarNotificationFeed() {
  const { notifications, deleteNotification } = useNotifications();
  const [exiting, setExiting]             = useState<Set<string>>(new Set());
  const [overflowing, setOverflowing]     = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const feed = notifications.filter(n => !n.read_at).slice(0, 10);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const check = () => setOverflowing(inner.scrollHeight > outer.clientHeight);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(inner);
    ro.observe(outer);
    return () => ro.disconnect();
  }, [feed.length, exiting.size]);

  const handleDismiss = (id: string) => {
    setExiting(prev => new Set(prev).add(id));
    setTimeout(() => {
      deleteNotification(id);
      setExiting(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  };

  if (feed.length === 0) return null;

  return (
    <div
      ref={outerRef}
      className="relative hidden md:block px-2 pt-1"
      style={{
        overflow:  'hidden',
        flex:      '1 1 0',
        minHeight: 0,
      }}
    >
      <div
        ref={innerRef}
        style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'stretch',
          paddingBottom: overflowing ? '72px' : '4px',
          transition:    'padding-bottom 300ms ease',
        }}
      >
        {feed.map(n => (
          <NotificationFeedItem
            key={n.id}
            notification={n}
            onDismiss={handleDismiss}
            exiting={exiting.has(n.id)}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position:      'absolute',
          bottom:        0,
          left:          '8px',
          right:         '8px',
          height:        '100px',
          pointerEvents: 'none',
          opacity:       overflowing ? 1 : 0,
          transition:    'opacity 400ms ease',
          background:    'linear-gradient(to bottom, transparent 0%, var(--background) 85%)',
        }}
      />
    </div>
  );
}