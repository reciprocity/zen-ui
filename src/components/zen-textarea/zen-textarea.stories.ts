import { html } from 'lit-html';
import markdown from './readme.md';
import { action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['zenTextarea'];

const argTypes = {
  value: {
    control: {
      type: 'text',
    },
  },
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
  cols: {
    type: { name: 'string', required: false },
    description: 'set if the input is disabled',
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 30 },
    },
    defaultValue: 30,
    control: {
      type: 'range',
      min: 30,
      max: 120,
      step: 1,
    },
  },
  rows: {
    type: { name: 'string', required: false },
    description: 'set if the input is disabled',
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: 1 },
    },
    defaultValue: 1,
    control: {
      type: 'range',
      min: 1,
      max: 10,
      step: 1,
    },
  },
};

export default {
  title: 'Components/Zen Textarea',
  component: 'zen-textarea',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ value, disabled, placeholder, required, cols, rows }) => {
  value = value ? value : '';
  disabled = disabled ? disabled : false;
  required = required ? required : false;
  placeholder = placeholder ? placeholder : '';
  cols = cols ? cols : 30;
  rows = rows ? rows : 1;
  return html`<zen-textarea
      value=${value}
      placeholder=${placeholder}
      disabled=${disabled}
      required=${required}
      cols=${cols}
      rows=${rows}
    />
    ${action('zen-textarea', customEvents)}`;
};

export const Default = Template.bind({});
