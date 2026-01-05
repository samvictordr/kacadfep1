// Service Worker for Academy Student PWA
const CACHE_NAME = 'academy-student-v1';
const SHELL_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.svg',
    './icons/icon-512.svg'
];

// Install event - cache shell assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching shell assets');
                return cache.addAll(SHELL_ASSETS);
            })
            .then(() => {
                console.log('[SW] Install complete');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name.startsWith('academy-student-') && name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Activate complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - network first for API, cache first for shell
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // NEVER cache API requests, auth tokens, or sensitive data
    if (url.pathname.startsWith('/auth') ||
        url.pathname.startsWith('/student') ||
        url.pathname.startsWith('/teacher') ||
        url.pathname.startsWith('/store') ||
        url.pathname.startsWith('/api') ||
        url.origin !== location.origin) {
        // Network only for API requests
        event.respondWith(fetch(event.request));
        return;
    }
    
    // Cache first for shell assets, fallback to network
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Only cache same-origin GET requests
                        if (event.request.method === 'GET' && url.origin === location.origin) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Return cached index.html for navigation requests when offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        return new Response('Offline', { status: 503, statusText: 'Offline' });
                    });
            })
    );
});
