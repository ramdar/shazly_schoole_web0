const cacheName = 'school-app-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/materials.html',
  '/lesson.html',
  '/review.html',
  '/style.css',
  '/script.js',
  '/data/elementary/arabic.json',
  '/data/elementary/math.json',
  '/data/preparatory/science.json',
  // ... قم بتضمين جميع ملفات JSON الأخرى
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});