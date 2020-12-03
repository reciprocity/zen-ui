import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  value: {
    type: { name: 'string', required: false },
    description: 'Set value of input.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'null' },
    },
    control: {
      type: 'text',
    },
  },
  placeholder: {
    type: { name: 'string', required: false },
    description: 'Set placeholder of input.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'null' },
    },
    control: {
      type: 'text',
    },
  },
  required: {
    type: { name: 'string', required: false },
    description: 'Set if input is required.',
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
    description: 'Set if input is disabled.',
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
  title: 'Components/Zen Input',
  component: 'zen-input',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ value, placeholder, disabled, required }) => {
  disabled = disabled ? disabled : false;
  required = required ? required : false;
  placeholder = placeholder ? placeholder : '';
  value = value ? value : '';
  return html`<zen-input value=${value} placeholder=${placeholder} disabled=${disabled} required=${required} />`;
};

export const Default = Template.bind({});
