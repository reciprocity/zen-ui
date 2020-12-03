import { html } from 'lit-html';
import markdown from './readme.md';
import { action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['zenInput'];

const argTypes = {
  value: {
    type: { name: 'string', required: false },
    control: {
      type: 'text',
    },
  },
  placeholder: {
    type: { name: 'string', required: false },
    control: {
      type: 'text',
    },
  },
  required: {
    type: { name: 'string', required: false },
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    type: { name: 'string', required: false },
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
  return html`<zen-input value=${value} placeholder=${placeholder} disabled=${disabled} required=${required} />
    ${action('zen-input', customEvents)}`;
};

export const Default = Template.bind({});
