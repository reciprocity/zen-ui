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

const Template = ({ selected }) => {
  return html` <zen-menu-item selected=${selected}></zen-menu-item> `;
};

export const Default = Template.bind({});
Default.args = {
  selected: false,
};
