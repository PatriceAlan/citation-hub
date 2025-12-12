
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://patricealan.github.io/citation-hub/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/citation-hub"
  },
  {
    "renderMode": 2,
    "route": "/citation-hub/daily"
  },
  {
    "renderMode": 2,
    "route": "/citation-hub/authors"
  },
  {
    "renderMode": 2,
    "route": "/citation-hub/keywords"
  },
  {
    "renderMode": 2,
    "route": "/citation-hub/favorites"
  },
  {
    "renderMode": 2,
    "redirectTo": "/citation-hub",
    "route": "/citation-hub/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6936, hash: '985ebe935448d975a75756b765163334a96121fc44fed06acfb6cb109fc30beb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 991, hash: '440b025d79af77c123a382a95e69bf6f26c733649edf58c76c859ca13dbb445f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'daily/index.html': {size: 14859, hash: '282d4eeb6b3ff6716e2b2f8a7292c6091d779bd9c3355a6ace9c4ed064d36450', text: () => import('./assets-chunks/daily_index_html.mjs').then(m => m.default)},
    'index.html': {size: 13967, hash: '0e29249c342bf266dc3a8e6e9b2a2c2a15c35e589ae3b363b5545dc1626e5176', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'keywords/index.html': {size: 25072, hash: '32add9ee6bd2504c3afbba8696bf94a5bb237a1e1e6166d1d9a2f3f095f5cfb8', text: () => import('./assets-chunks/keywords_index_html.mjs').then(m => m.default)},
    'favorites/index.html': {size: 15008, hash: '16d722d5284347e565ebf97e7f5e0ea26ec6a6fac87d8d353f0b1fa880280a98', text: () => import('./assets-chunks/favorites_index_html.mjs').then(m => m.default)},
    'authors/index.html': {size: 44125, hash: 'e5ffc1c59f6952e882055032eabd007d9c6099a6244b02308b9e600417c4e947', text: () => import('./assets-chunks/authors_index_html.mjs').then(m => m.default)},
    'styles-KNB2I5K3.css': {size: 19548, hash: 'fP9LNKSdDOI', text: () => import('./assets-chunks/styles-KNB2I5K3_css.mjs').then(m => m.default)}
  },
};
