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

const TemplatePrimary = () => {
    return html`
    <zen-button text="I'm a primary button"></zen-button>
    `;
};

const TemplateDanger = () => {
    return html`
    <zen-button text="I'm a danger button" variant="danger"></zen-button>
    `;
};

export const Default = Template.bind({});
export const PrimaryButtonStory = TemplatePrimary.bind({});
export const DangerButtonStory = TemplateDanger.bind({});
