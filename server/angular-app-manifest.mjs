
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/citation-hub/',
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
    'index.csr.html': {size: 6907, hash: '47861c778c9abc08f74e8824e84fd65af24d79bcfa585ba3aa46627da71eb108', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 962, hash: 'f135a4943b2274909df9c5fd43a9034f6e08ec1a61fb7130e3363602a5bd7e8a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 13938, hash: '709a004fe32a7f4a13223ace5b07414ba20be014df98f255026a330e81335dca', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'daily/index.html': {size: 14830, hash: '8167e322b41156a66f1163e217d6605b88599beff2b620f7f4c7adf630007f6a', text: () => import('./assets-chunks/daily_index_html.mjs').then(m => m.default)},
    'keywords/index.html': {size: 25043, hash: '3088bef0523983d4a04c9a6df7690f96685393351d7fc21bd01b75ab55ffcf40', text: () => import('./assets-chunks/keywords_index_html.mjs').then(m => m.default)},
    'authors/index.html': {size: 44096, hash: '3197ad2706a68c170e1bb872d437ce33a1372fd0cd7c57ef0dd56233be690ec5', text: () => import('./assets-chunks/authors_index_html.mjs').then(m => m.default)},
    'favorites/index.html': {size: 14979, hash: '35f37ea22e43cfa5fbc3bed7c2bba2179a4f835502240c5cb70cf30b8037a4e7', text: () => import('./assets-chunks/favorites_index_html.mjs').then(m => m.default)},
    'styles-KNB2I5K3.css': {size: 19548, hash: 'fP9LNKSdDOI', text: () => import('./assets-chunks/styles-KNB2I5K3_css.mjs').then(m => m.default)}
  },
};
