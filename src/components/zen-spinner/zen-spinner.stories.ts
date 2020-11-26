import { html } from 'lit-html';
import markdown from './readme.md';

export default {
  title: 'Components/Zen Spinner',
  component: 'zen-spinner',
  parameters: {
    notes: {markdown},
  },
};

const Template = () => {
    return html`
    <zen-spinner></zen-spinner>
    `;
};

export const Default = Template.bind({});
