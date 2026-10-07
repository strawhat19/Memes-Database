const cachePrefix = `memes-database-`;
const cacheName = `${cachePrefix}v3`;
const appShell = [
  `/`,
  `/favicon.svg`,
  `/brand/logo.svg`,
  `/brand/logo-mark.svg`,
  `/icons/icon-192.png`,
  `/icons/icon-512.png`,
  `/icons/icon-maskable-512.png`,
  `/manifest.webmanifest`,
  `/memes/weekend-mode.png`,
  `/memes/one-more-tab.png`,
  `/memes/monday-loading.png`,
  `/visuals/hero-night-background.png`,
  `/visuals/hero-cream-background.png`,
];
const assetPrefixes = [
  `/brand/`,
  `/icons/`,
  `/memes/`,
  `/visuals/`,
  `/assets/`,
  `/_expo/`,
];
const assetDestinations = [
  `font`,
  `image`,
  `style`,
  `script`,
];

const canCache = (response) => {
  const policy = response.headers.get(`cache-control`) || ``;

  return response.ok
    && response.type === `basic`
    && new URL(response.url).origin === self.location.origin
    && !/(?:no-store|private)/i.test(policy);
};

const remember = async (cache, request, response) => {
  if (!canCache(response)) return;

  try {
    await cache.put(request, response.clone());
  } catch {
    // A full or unavailable cache must not interrupt browsing.
  }
};

const loadPage = async (request) => {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    await remember(cache, request, response);
    return response;
  } catch {
    const saved = await cache.match(request)
      || await cache.match(`/index.html`)
      || await cache.match(`/`);

    return saved || new Response(`Memes Database is unavailable offline. Reconnect to load this page.`, {
      status: 503,
      headers: { 'Content-Type': `text/plain; charset=utf-8` },
    });
  }
};

const loadAsset = async (request) => {
  const cache = await caches.open(cacheName);
  const saved = await cache.match(request);

  if (saved) return saved;

  const response = await fetch(request);
  await remember(cache, request, response);
  return response;
};

self.addEventListener(`install`, (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(appShell)));
});

self.addEventListener(`activate`, (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith(cachePrefix) && name !== cacheName)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener(`fetch`, (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== `GET` || url.origin !== self.location.origin) return;
  if (url.pathname === `/api` || url.pathname.startsWith(`/api/`)) return;

  if (request.mode === `navigate`) {
    event.respondWith(loadPage(request));
    return;
  }

  const isAppAsset = assetPrefixes.some((prefix) => url.pathname.startsWith(prefix))
    && assetDestinations.includes(request.destination);
  const isShellAsset = appShell.includes(url.pathname) && url.pathname !== `/`;

  if (isAppAsset || isShellAsset) event.respondWith(loadAsset(request));
});
