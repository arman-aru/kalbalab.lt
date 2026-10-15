// KalbaLab service worker — minimum viable for installability + offline shell.
//
// Strategy:
//   - Pages (navigations) and everything else: NETWORK-FIRST, cache as offline
//     fallback. Pages must never be served stale — a cached HTML page points at
//     build chunks that no longer exist after a deploy, which breaks hydration
//     (site renders but nothing is clickable).
//   - /_next/static/*: CACHE-FIRST. These filenames are content-hashed in
//     production builds, so a cached copy can never be outdated.
//
// Bump CACHE whenever these rules change so old installed workers drop their
// previous cache on activate. (v3: switched pages from cache-first to
// network-first and stopped caching RSC payloads.)

const CACHE = "kalbalab-v3";
const SHELL = ["/", "/login", "/register", "/favicon_io/site.webmanifest"];

// Never read from or write to cache. /api/ covers all backend calls (TTS,
// translate, contact, etc); /auth/ is OAuth callbacks; webpack-hmr is dev-only.
const NEVER_CACHE_PREFIXES = ["/api/", "/auth/", "/_next/data/", "/_next/webpack-hmr"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isCacheable(res, url) {
  return (
    res.ok &&
    url.origin === self.location.origin &&
    !(res.headers.get("content-type") || "").startsWith("audio/")
  );
}

function putInCache(req, res) {
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => undefined);
}

function networkFirst(req, url) {
  return fetch(req)
    .then((res) => {
      if (isCacheable(res, url)) putInCache(req, res);
      return res;
    })
    .catch(() =>
      caches.match(req).then((hit) => hit || (req.mode === "navigate" ? caches.match("/") : undefined))
    )
    .then((res) => res || Response.error());
}

function cacheFirst(req, url) {
  return caches.match(req).then(
    (hit) =>
      hit ||
      fetch(req).then((res) => {
        if (isCacheable(res, url)) putInCache(req, res);
        return res;
      })
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (NEVER_CACHE_PREFIXES.some((p) => url.pathname.startsWith(p))) return;

  // React Server Component payloads (client-side navigations) vary per build
  // and per request headers — never cache them.
  if (req.headers.get("RSC") || url.searchParams.has("_rsc")) return;

  // Defensive: never cache audio responses regardless of path.
  const accept = req.headers.get("accept") || "";
  if (accept.startsWith("audio/")) return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(req, url));
    return;
  }

  event.respondWith(networkFirst(req, url));
});
