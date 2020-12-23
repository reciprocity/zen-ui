import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  text: {
    defaultValue: 'Support text',
    control: {
      type: 'text',
    },
  },
};

export default {
  title: 'Forms/一Fragments/Input Support Text',
  component: 'zen-input-support-text',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ text, required }) => {
  text = text ? text : '';
  return html` <zen-input-support-text text=${text} required=${required} /> `;
};

export const Default = Template.bind({});
