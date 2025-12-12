
export default {
  basePath: 'https://patricealan.github.io/citation-hub',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
