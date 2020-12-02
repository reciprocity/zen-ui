import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  checked: {
    type: { name: 'string', required: false },
    description: 'set if the input is checked',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    type: { name: 'string', required: false },
    description: 'set if the input is disabled',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
    control: {
      type: 'boolean',
    },
  },
};

export default {
  title: 'Components/Zen Checkbox',
  component: 'zen-checkbox',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ checked, disabled }) => {
  checked = checked ? checked : false;
  disabled = disabled ? disabled : false;
  return html`<zen-checkbox checked=${checked} disabled=${disabled} />`;
};

export const Default = Template.bind({});
