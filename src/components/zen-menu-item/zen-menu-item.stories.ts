import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Components/Menu Item',
  component: 'zen-menu-item',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = () => {
  return html` <zen-menu-item> </zen-menu-item> `;
};

export const Default = Template.bind({});
