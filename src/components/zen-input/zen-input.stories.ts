import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  placeholder: {
    type: { name: 'string', required: false },
    description: 'set placeholder of the input',
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
    description: 'set if the input is required',
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
  title: 'Components/Zen Input',
  component: 'zen-input',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ disabled, placeholder, required }) => {
  disabled = disabled ? disabled : false;
  required = required ? required : false;
  placeholder = placeholder ? placeholder : 'Default placeholder';
  return html`<zen-input placeholder=${placeholder} disabled=${disabled} required=${required} />`;
};

export const Default = Template.bind({});
