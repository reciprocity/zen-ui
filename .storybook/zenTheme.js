import { create } from '@storybook/theming/create';
import ReciLogo from '../src/img/reciprocity.png';
const { version } = require('../package.json');

export default create({
  base: 'light',

  colorPrimary: 'hotpink',
  colorSecondary: '#1b2940',

  // UI
  appBg: '#fff',
  appContentBg: '#fff',
  appBorderColor: '#ebeef3',
  appBorderRadius: 2,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'rgba(255,255,255,0.8)',
  textInverseColor: 'rgba(255,255,255,1)',

  // Toolbar default and active colors
  // barTextColor: 'white',
  // barSelectedColor: 'white',
  // barBg: 'hotpink',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandUrl: 'https://example.com',
  brandImage: ReciLogo,
  brandTitle: `<h2 style="font-weight: bold">Zen-UI</h2> <small style="font-size: 9px;">version ${version}</small>`,
});