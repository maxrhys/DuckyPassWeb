// This service worker caches all resources.
self.addEventListener('fetch', function(event) {
    // Cache all resources.
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
  