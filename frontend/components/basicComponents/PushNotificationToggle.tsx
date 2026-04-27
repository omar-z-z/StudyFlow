// components/PushNotificationToggle.tsx
'use client';

import { Bell, BellOff } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Button } from '@/components/basicComponents/button';

export default function PushNotificationToggle() {
  const { supported, subscribed, loading, subscribe, unsubscribe } =
    usePushNotifications();

  if (!supported) return null;

  return (
    <Button
      onClick={subscribed ? unsubscribe : subscribe}
      disabled={loading}
      variant="outline"
      className="w-full justify-start gap-3"
    >
      {subscribed
        ? <BellOff className="w-5 h-5 shrink-0" />
        : <Bell    className="w-5 h-5 shrink-0" />}
      {loading
        ? 'Loading...'
        : subscribed ? 'Disable Push' : 'Enable Push'}
    </Button>
  );
}