import { create } from '@storybook/theming/create';
import ReciLogo from '../src/stories/img/infinity-logo-tight_white.svg';
const { version } = require('../package.json');

export default create({
  base: 'dark',

  colorPrimary: 'hotpink',
  colorSecondary: '#0078cd', // selected lhn item bg, icons

  // UI
  appBg: '#1e272c', // lhn bg color
  appContentBg: '#f9f9f9', // preview page bg
  appBorderColor: '#ebeef3',
  appBorderRadius: 2,

  // Typography
  fontBase: '"Open Sans", Courier, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#ffffff', // lhn text
  textInverseColor: '#f00',

  // Toolbar default and active colors
  barTextColor: 'rgba(0,0,0,0.5)',
  barSelectedColor: '#0078cd',
  barBg: '#fff',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandUrl: 'https://example.com',
  brandImage: ReciLogo,
  brandTitle: `<h2 style="font-weight: bold">Zen-UI</h2> <small style="font-size: 9px;">version ${version}</small>`,
});