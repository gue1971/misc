const CACHE_NAME = 'misc-v20260723';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icons/phrase-atlas.png',
  './assets/icons/refinery.png',
  './assets/icons/trash-days.png',
  './assets/icons/body-tune.png',
  './assets/icons/line-stamp-index.png',
  './assets/icons/timeline.png',
  './assets/icons/oval.png',
  './assets/icons/duo.png',
  './assets/icons/horse.png',
  './assets/icons/photo-paddock.png',
  './assets/icons/board.png',
  './assets/icons/viewer.png',
  './assets/icons/catalog.png',
  './assets/icons/renai.png',
  './assets/icons/ai-news-2025.png',
  './assets/icons/y-note.png',
  './assets/icons/amidapon.png',
  './assets/icons/carp-app.png',
  './assets/icons/quokka55.png',
  './assets/icons/little-free.svg',
  './assets/icons/asset.png',
  './assets/icons/loopay.png',
  './assets/icons/kayoi.png',
  './assets/icons/monory.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){ return cache.addAll(APP_SHELL); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys()
      .then(function(keys){
        return Promise.all(keys.filter(function(key){ return key !== CACHE_NAME; }).map(function(key){ return caches.delete(key); }));
      })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(event){
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(function(cached){
      return cached || fetch(event.request).then(function(response){
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, copy); });
        return response;
      });
    })
  );
});
