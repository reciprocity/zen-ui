import { Config } from '@stencil/core';
import analyze from 'rollup-plugin-analyzer';

export const config: Config = {
  namespace: 'zen-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  rollupPlugins: {
    after: [
      analyze({ summaryOnly: true })
    ]
  }
};
