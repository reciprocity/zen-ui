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

const Template = ({ selected, label, focused }) => {
  return html` <zen-menu-item ?selected=${selected} ?focused=${focused} label=${label} />`;
};

export const Default = Template.bind({});
Default.args = {
  selected: false,
  focused: false,
  label: 'My menu item',
};

const SlottedTemplate = () => {
  return html` <zen-menu-item>
    <div slot="content">Custom content</div>
  </zen-menu-item>`;
};

export const CustomContentSlot = SlottedTemplate.bind({});
