const CACHE_NAME = 'portfolio-v2-cosmic';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/tailwind.build.css',
  './css/meteor.css',
  './css/fireflies.css',
  './css/aurora.css',
  './css/nabla-typewriter.css',
  './css/cursor.css',
  './css/cards.css',
  './css/loading.css',
  './js/theme-init.js',
  './js/loading.js',
  './js/raf-scheduler.js',
  './js/theme.js',
  './js/animations.js',
  './js/form.js',
  './js/meteor-shower.js',
  './js/fireflies.js',
  './js/performance.js',
  './js/cursor.js',
  './js/cards.js',
  './Assets/favicon.webp',
  './Assets/profile-pic-cropped.webp',
  './Assets/yt-title-desc-generator.webp',
  './Assets/anomlogbert.webp',
  './Assets/urban-escapade.webp',
  './Assets/fpl-analytics-hub.webp',
  './Assets/Updated%20Resume.pdf',
  './Assets/fonts/InterVariable.woff2',
  './Assets/fonts/InterVariable-Italic.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
