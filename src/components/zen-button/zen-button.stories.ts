import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Components/Zen Button',
  component: 'zen-button',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = () => {
  return html` <zen-button></zen-button> `;
};

const TemplatePrimary = () => {
  return html`
    <zen-button label="Primary button"></zen-button>
    <zen-button label="Primary button" disabled></zen-button>
    <zen-button label="Primary button" loading></zen-button>
  `;
};

const TemplateSecondary = () => {
  return html`
    <zen-button label="Secondary button" variant="secondary"></zen-button>
    <zen-button label="Secondary button" variant="secondary" disabled></zen-button>
    <zen-button label="Secondary button" variant="secondary" loading></zen-button>
  `;
};

const TemplateTertiary = () => {
  return html`
    <zen-button label="Tertiary button" variant="tertiary"></zen-button>
    <zen-button label="Tertiary button" variant="tertiary" disabled></zen-button>
    <zen-button label="Tertiary button" variant="tertiary" loading></zen-button>
  `;
};

const TemplateDestructive = () => {
  return html`
    <zen-button label="Destructive button" variant="destructive"></zen-button>
    <zen-button label="Destructive button" variant="destructive" disabled></zen-button>
    <zen-button label="Destructive button" variant="destructive" loading></zen-button>
  `;
};

const TemplatePositive = () => {
  return html`
    <zen-button label="Positive button" variant="positive"></zen-button>
    <zen-button label="Positive button" variant="positive" disabled></zen-button>
    <zen-button label="Positive button" variant="positive" loading></zen-button>
  `;
};

export const Default = Template.bind({});
export const PrimaryButtonStory = TemplatePrimary.bind({});
export const SecondaryButtonStory = TemplateSecondary.bind({});
export const TertiaryButtonStory = TemplateTertiary.bind({});
export const DestructiveButtonStory = TemplateDestructive.bind({});
export const PositiveButtonStory = TemplatePositive.bind({});
