import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Dropdown/Menu Item',
  component: 'zen-menu-item',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ selected, label }) => {
  return html` <zen-menu-item selected=${selected} label=${label}></zen-menu-item> `;
};

export const Default = Template.bind({});
Default.args = {
  selected: false,
  label: 'My menu item',
};
