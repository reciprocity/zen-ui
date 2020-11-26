import { create } from '@storybook/theming/create';
const { version } = require('../package.json');

export default create({
  base: 'light',

  colorPrimary: 'hotpink',
  colorSecondary: '#1b2940',

  // UI
  appBg: '#3a537b',
  appContentBg: '#fff',
  appBorderColor: '#ebeef3',
  appBorderRadius: 2,

  // Typography
  fontBase: '"Open Sans", Courier, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#222',
  textInverseColor: '#f00',

  // Toolbar default and active colors
  barTextColor: 'rgba(0,0,0,0.5)',
  barSelectedColor: '#3a537b',
  barBg: '#fff',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});