import { addons } from '@storybook/addons';
import zenTheme from './zenTheme';

addons.setConfig({
  theme: zenTheme,
  /* TODO:
    initialActive isn't working atm. Remove --docs (docmode) and show tabs when it does!
  */
  initialActive: 'Docs',
  enableShortcuts: false,
  previewTabs: {
    'storybook/docs/panel': { index: 0, title: 'Docs', hidden: true },
    canvas: { title: 'Events', index: 1, hidden: true },
  },
});
