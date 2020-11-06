import { Config } from '@stencil/core';

const { name, distDirs } = require('./package.json');

export const config: Config = {
  namespace: name,
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
