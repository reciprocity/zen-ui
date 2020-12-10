import { html } from 'lit-html';
import markdown from './readme.md';
import { action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['zenInput'];

export default {
  title: 'Components/Zen Textarea',
  component: 'zen-textarea',
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
Default.args = {
  text: '',
  placeholder: '',
  required: false,
  disabled: false,
};
