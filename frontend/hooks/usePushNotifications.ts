"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; i++) {
    view[i] = rawData.charCodeAt(i);
  }
  return view;
}

export function usePushNotifications() {
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSupported("serviceWorker" in navigator && "PushManager" in window);
  }, []);

  const subscribe = async () => {
    if (!supported) return;
    setLoading(true);

    try {
      // 1. Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Push permission denied");
        return;
      }

      // 2. Register service worker
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      // 3. Subscribe to push
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ) as unknown as Uint8Array<ArrayBuffer>,
      });

      // 4. Send subscription to Laravel
      const sub = subscription.toJSON();
      await apiFetch("/push/subscribe", {
        method: "POST",
        body: JSON.stringify({
          endpoint: sub.endpoint,
          public_key: sub.keys?.p256dh,
          auth_token: sub.keys?.auth,
        }),
      });

      setSubscribed(true);
    } catch (err) {
      console.error("Push subscription failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    if (!supported) return;
    setLoading(true);

    try {
      const reg = await navigator.serviceWorker.getRegistration("/sw.js");
      const subscription = await reg?.pushManager.getSubscription();
      if (!subscription) return;

      await apiFetch("/push/unsubscribe", {
        method: "DELETE",
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });

      await subscription.unsubscribe();
      setSubscribed(false);
    } catch (err) {
      console.error("Push unsubscription failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { supported, subscribed, loading, subscribe, unsubscribe };
}
