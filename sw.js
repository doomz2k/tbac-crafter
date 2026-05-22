const VERSION = '1.0.14';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if(e.request.url.startsWith(self.location.origin)){
    e.respondWith(
      fetch(new Request(e.request, { cache: 'no-store' }))
        .catch(() => caches.match(e.request))
    );
  }
});
