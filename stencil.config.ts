import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { name as packageName } from './package.json';

export const config: Config = {
  namespace: 'zen-ui',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: packageName,
      proxiesFile: './react/src/output/components.ts',
      includeDefineCustomElements: false,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'docs-json',
      file: 'stencilDocs.json',
    },
  ],
  plugins: [sass()],
  testing: {
    transform: {
      '^.+\\.js?$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!query-selector-shadow-dom/)'],
  },
  extras: {
    tagNameTransform: true,
  },
};
