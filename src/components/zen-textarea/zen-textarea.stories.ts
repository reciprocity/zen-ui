import { html } from 'lit-html';
import markdown from './readme.md';
import { action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['keyboardInput'];

const argTypes = {
  text: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  required: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  width: {
    control: {
      type: 'text',
    },
  },
  height: {
    control: {
      type: 'text',
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

const Template = ({ text, placeholder, required, disabled, width, height }) => {
  text = text ? text : '';
  placeholder = placeholder ? placeholder : '';
  required = required ? required : false;
  disabled = disabled ? disabled : false;
  width = width ? width : '';
  height = height ? height : '';
  return html`<zen-textarea
      text=${text}
      placeholder=${placeholder}
      width=${width}
      height=${height}
      disabled=${disabled}
      required=${required}
    />
    ${action('zen-textarea', customEvents)}`;
};

export const Default = Template.bind({});
