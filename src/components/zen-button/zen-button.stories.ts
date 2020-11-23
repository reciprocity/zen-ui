import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
};

export default {
  title: 'Components/Zen Button',
  component: 'zen-button',
  argTypes,
  parameters: {
    notes: {markdown},
  },
};

const Template = () => {
    return html`
    <zen-button></zen-button>
    `;
};

export const Default = Template.bind({});
export const PrimaryButtonStory = Template.bind({});
export const DangerButtonStory = Template.bind({});
