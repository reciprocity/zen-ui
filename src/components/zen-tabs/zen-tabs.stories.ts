import { html } from 'lit-html';
import markdown from './readme.md';

export default {
  title: 'In progress/Tabs',
  component: 'zen-tabs',
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ items, value }) => {
  return html`<zen-tabs .tabs=${items} value=${value} />`;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'Tab 1', value: 1 },
    { label: 'Tab 2', value: 2 },
    { label: 'Tab 3', value: 3 },
  ],
  value: 2,
};
