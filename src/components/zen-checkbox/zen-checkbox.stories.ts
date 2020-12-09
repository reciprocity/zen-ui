import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  label: {
    defaultValue: 'Label',
    control: {
      type: 'text',
    },
  },
  checked: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  required: {
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

const Template = ({ label, checked, required, disabled }) => {
  checked = checked ? checked : false;
  disabled = disabled ? disabled : false;
  required = required ? required : false;
  label = label ? label : '';
  return html`<zen-checkbox checked=${checked} disabled=${disabled} label=${label} required=${required} />`;
};

export const Default = Template.bind({});
