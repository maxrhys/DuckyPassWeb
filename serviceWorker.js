// This service worker caches all resources.
self.addEventListener('fetch', function(event) {
  // Try to fetch the resource from the network. If that fails after 5 seconds, serve a cached resource.
  const timeout = setTimeout(() => {
    event.respondWith(caches.match(event.request));
  }, 5000);

  event.respondWith(fetch(event.request).then(response => {
    clearTimeout(timeout);
    return response;
  }));

  // Cache the resource, even if the network fetch fails.
  caches.open('all').then(function(cache) {
    cache.put(event.request, event.respondWith(fetch(event.request)));
  });
});

// This service worker updates the cache when the user visits the website.
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Delete any caches that are not in the manifest.
          if (cacheName !== 'all') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
