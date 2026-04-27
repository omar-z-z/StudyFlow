"use client";

import { Bell, BellOff } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function PushNotificationToggle() {
  const { supported, subscribed, loading, subscribe, unsubscribe } =
    usePushNotifications();

  if (!supported) return null;

  return (
    <div className="px-3 py-1">
      <button
        onClick={subscribed ? unsubscribe : subscribe}
        disabled={loading}
        className="flex items-center gap-2 w-full px-3 py-1.5 rounded-md
                   text-xs text-muted-foreground hover:text-foreground
                   hover:bg-muted transition-colors disabled:opacity-50"
      >
        {subscribed ? (
          <BellOff className="w-3.5 h-3.5 shrink-0" />
        ) : (
          <Bell className="w-3.5 h-3.5 shrink-0" />
        )}
        {loading
          ? "Setting up..."
          : subscribed
            ? "Device notifications enabled"
            : "Turn on device notifications"}
      </button>
    </div>
  );
}
