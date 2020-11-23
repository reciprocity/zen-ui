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
    <zen-button text="Primary button"></zen-button>
    <zen-button text="Primary button" is-disabled></zen-button>
    `;
};

const TemplateSecondary = () => {
  return html`
  <zen-button text="Secondary button" variant="secondary"></zen-button>
  <zen-button text="Secondary button" variant="secondary" is-disabled></zen-button>
  `;
};

const TemplateTertiary = () => {
  return html`
  <zen-button text="Tertiary button" variant="tertiary"></zen-button>
  <zen-button text="Tertiary button" variant="tertiary" is-disabled></zen-button>
  `;
};

const TemplateDestructive = () => {
    return html`
    <zen-button text="Destructive button" variant="destructive"></zen-button>
    <zen-button text="Destructive button" variant="destructive" is-disabled></zen-button>
    `;
};

export const Default = Template.bind({});
export const PrimaryButtonStory = TemplatePrimary.bind({});
export const SecondaryButtonStory = TemplateSecondary.bind({});
export const TertiaryButtonStory = TemplateTertiary.bind({});
export const DestructiveButtonStory = TemplateDestructive.bind({});
