import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

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
      footer: '',
    },
    {
      type: 'docs-json',
      file: 'stencilDocs.json',
    },
  ],
  plugins: [sass(), inlineSvg()],
  testing: {
    transform: {
      '^.+\\.js?$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!query-selector-shadow-dom/)'],
  },
};
