import { html } from 'lit-html';
import markdown from './readme.md';
import { ButtonVariants } from './types';

const argTypes = {
  variant: {
    control: { type: 'select', options: Object.keys(ButtonVariants).map(n => ButtonVariants[n]) },
  },
};

export default {
  title: 'Components/Zen Button',
  component: 'zen-button',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ label, variant, loading, disabled }) => {
  return html`
    <zen-button label="${label}" variant="${variant}" loading="${loading}" disabled="${disabled}"></zen-button>
  `;
};

const TemplatePrimary = () => {
  return html` <zen-button style="margin: 10px;" label="Primary button"></zen-button>
    <zen-button style="margin: 10px;" label="Primary button" disabled></zen-button>
    <zen-button style="margin: 10px;" label="Primary button" loading></zen-button>`;
};

const TemplateSecondary = () => {
  return html` <zen-button style="margin: 10px;" variant="secondary" label="Secondary button"></zen-button>
    <zen-button style="margin: 10px;" variant="secondary" label="Secondary button" disabled></zen-button>
    <zen-button style="margin: 10px;" variant="secondary" label="Secondary button" loading></zen-button>`;
};

const TemplateTertiary = () => {
  return html` <zen-button style="margin: 10px;" variant="tertiary" label="Tertiary button"></zen-button>
    <zen-button style="margin: 10px;" variant="tertiary" label="Tertiary button" disabled></zen-button>
    <zen-button style="margin: 10px;" variant="tertiary" label="Tertiary button" loading></zen-button>`;
};

const TemplateDestructive = () => {
  return html` <zen-button style="margin: 10px;" variant="destructive" label="Destructive button"></zen-button>
    <zen-button style="margin: 10px;" variant="destructive" label="Destructive button" disabled></zen-button>
    <zen-button style="margin: 10px;" variant="destructive" label="Destructive button" loading></zen-button>`;
};

const TemplatePositive = () => {
  return html` <zen-button style="margin: 10px;" variant="positive" label="Positive button"></zen-button>
    <zen-button style="margin: 10px;" variant="positive" label="Positive button" disabled></zen-button>
    <zen-button style="margin: 10px;" variant="positive" label="Positive button" loading></zen-button>`;
};

const TemplateLeading = () => {
  return html`
    <zen-button label="Button">
      <zen-spinner slot="leadingIcon"></zen-spinner>
    </zen-button>
  `;
};

const TemplateTrailing = () => {
  return html`
    <zen-button label="Button">
      <zen-spinner slot="trailingIcon"></zen-spinner>
    </zen-button>
  `;
};

const TemplateBoth = () => {
  return html`
    <zen-button label="Button">
      <zen-spinner slot="leadingIcon"></zen-spinner>
      <zen-spinner slot="trailingIcon"></zen-spinner>
    </zen-button>
  `;
};

export const Default = Template.bind({});
export const PrimaryButtonStory = TemplatePrimary.bind({});
export const SecondaryButtonStory = TemplateSecondary.bind({});
export const TertiaryButtonStory = TemplateTertiary.bind({});
export const DestructiveButtonStory = TemplateDestructive.bind({});
export const PositiveButtonStory = TemplatePositive.bind({});
export const WithLeadingSlot = TemplateLeading.bind({});
export const WithTrailingSlot = TemplateTrailing.bind({});
export const WithBothSlot = TemplateBoth.bind({});

Default.args = {
  label: 'Button',
  variant: 'primary',
  loading: false,
  disabled: false,
};
