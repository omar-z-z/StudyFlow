self.addEventListener('push', function (event) {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:  data.body,
      icon:  '/icon.png', // replace with your app icon path
      badge: '/icon.png',
      data:  { link: data.link ?? '/' },
    })
  );
});

// Click notification → open the app at the right page
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // If app is already open, focus it
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.focus();
            client.navigate(event.notification.data.link);
            return;
          }
        }
        // Otherwise open a new tab
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.link);
        }
      })
  );
});