import {defineCustomElements} from '../dist/esm/loader';
import '@storybook/addon-console';
import { setConsoleOptions } from '@storybook/addon-console';
import styles from './preview.scss';
import zenDocsTheme from './zenDocsTheme';

import React from 'react';

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY
} from '@storybook/addon-docs/blocks';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: false },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Getting started',
        'Changelog',
        'Developers',
        'Guides',
        [
          'Colors',
        ],
        'Typography',
        'Layout',
        'Forms',
        'Icons',
        'Navigation',
        'Notifications',
      ],
      locales: '',
    },
  },
  docs: {
    theme: zenDocsTheme,
    page: () => (
        <>
          <Title />
          <Subtitle />
          <Primary />
          <h3 className="css-5nkye">Playground</h3>
          <ArgsTable story={PRIMARY_STORY} />
          <Description />
          <Stories />
        </>
      ),
    extractComponentDescription: (component, { notes }) => {
      if (notes) {
        return typeof notes === 'string' ? notes : notes.markdown || notes.text;
      }
      return null;
    },
  },
}

const panelExclude = setConsoleOptions({}).panelExclude;
setConsoleOptions({
  panelExclude: [...panelExclude, /deprecated/],
});

defineCustomElements();
