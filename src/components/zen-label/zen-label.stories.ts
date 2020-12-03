import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  label: {
    defaultValue: 'Label',
    control: {
      type: 'text',
    },
  },
  required: {
    control: {
      type: 'boolean',
    },
  },
};

export default {
  title: 'Components/Zen Label',
  component: 'zen-label',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ label, required }) => {
  required = required ? required : false;
  label = label ? label : '';
  return html`<zen-label label=${label} required=${required} />`;
};

export const Default = Template.bind({});
