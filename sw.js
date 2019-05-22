// console.log('Service Worker: Registered');
self.addEventListener('install', function(e) {
  e.waitUntil(  // Wait until the installation completes.
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response; // The request exists, return it.
      }
      else {
        return fetch(e.request) // If the request does not exist, fetch it.
        .then(function(response) {
          const clonedResponse = response.clone();
          caches.open('v1').then(function(cache) {  // Add the request to the cache.
            cache.put(e.request, clonedResponse); // Pair the request with a response.
          })
          return response; // Return the response to the fetch.
        })
        .catch(function(err) {
          console.error(err);
        });
      }
    })
  );
})

const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
  ];