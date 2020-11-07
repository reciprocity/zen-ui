import { Config } from '@stencil/core';

const { name, distDirs } = require('./package.json');

export const config: Config = {
  namespace: name,
  buildEs5: false,
  taskQueue: 'async',
  devServer: {
    reloadStrategy: 'hmr',
    openBrowser: false,
  },
  outputTargets: [
    {
      type: 'dist',
      dir: distDirs.stencil,
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
      dir: distDirs.stencil,
    },
    {
      type: 'docs-readme',
      dir: distDirs.stencil,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
