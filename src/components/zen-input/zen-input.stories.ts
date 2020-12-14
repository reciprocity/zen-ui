import { html } from 'lit-html';
import markdown from './readme.md';
import { action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['zenInput'];

const argTypes = {
  value: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
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

const Template = ({ value, placeholder, disabled, invalid }) => {
  disabled = disabled ? disabled : false;
  invalid = invalid ? invalid : false;
  placeholder = placeholder ? placeholder : '';
  value = value ? value : '';
  return html`<zen-input value=${value} placeholder=${placeholder} disabled=${disabled} invalid=${invalid} /> ${action(
      'zen-input',
      customEvents,
    )}`;
};

const TemplateLeading = () => {
  return html`<zen-input placeholder="Insert text here...">
    <zen-spinner slot="leadingSlot"></zen-spinner>
  </zen-input>`;
};

const TemplateTrailing = () => {
  return html`<zen-input placeholder="Insert text here...">
    <zen-spinner slot="trailingSlot"></zen-spinner>
  </zen-input>`;
};

export const Default = Template.bind({});
export const WithLeadingSpinner = TemplateLeading.bind({});
export const WithTrailingSpinner = TemplateTrailing.bind({});
