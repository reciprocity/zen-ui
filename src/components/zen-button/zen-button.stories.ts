import { html } from 'lit-html';
import markdown from './readme.md';
import { ButtonVariants } from './types';
import { action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['click'];

const argTypes = {
  variant: {
    control: { type: 'select', options: Object.keys(ButtonVariants).map(n => ButtonVariants[n]) },
  },
};

export default {
  title: 'Buttons/Button',
  component: 'zen-button',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ variant, loading, disabled }) => {
  return html`
    <zen-button variant="${variant}" loading="${loading}" disabled="${disabled}">Button</zen-button>
    ${action('zen-button', customEvents)}
  `;
};

const TemplatePrimary = () => {
  return html` <zen-button style="margin: 10px;">Primary button</zen-button>
    <zen-button style="margin: 10px;" disabled>Primary button</zen-button>
    <zen-button style="margin: 10px;" loading>Primary button</zen-button>`;
};

const TemplateSecondary = () => {
  return html` <zen-button style="margin: 10px;" variant="secondary"> Secondary button </zen-button>
    <zen-button style="margin: 10px;" variant="secondary" disabled> Secondary button </zen-button>
    <zen-button style="margin: 10px;" variant="secondary" loading> Secondary button </zen-button>`;
};

const TemplateTertiary = () => {
  return html` <zen-button style="margin: 10px;" variant="tertiary">Tertiary button</zen-button>
    <zen-button style="margin: 10px;" variant="tertiary" disabled>Tertiary button</zen-button>
    <zen-button style="margin: 10px;" variant="tertiary" loading>Tertiary button</zen-button>`;
};

const TemplateDestructive = () => {
  return html` <zen-button style="margin: 10px;" variant="destructive">Destructive button</zen-button>
    <zen-button style="margin: 10px;" variant="destructive" disabled>Destructive button</zen-button>
    <zen-button style="margin: 10px;" variant="destructive" loading>Destructive button</zen-button>`;
};

const TemplatePositive = () => {
  return html` <zen-button style="margin: 10px;" variant="positive">Positive button</zen-button>
    <zen-button style="margin: 10px;" variant="positive" disabled>Positive button</zen-button>
    <zen-button style="margin: 10px;" variant="positive" loading>Positive button</zen-button>`;
};

const TemplateLeading = () => {
  return html`
    <zen-button>
      Button
      <zen-spinner slot="leadingIcon"></zen-spinner>
    </zen-button>
  `;
};

const TemplateTrailing = () => {
  return html`
    <zen-button>
      Button
      <zen-spinner slot="trailingIcon"></zen-spinner>
    </zen-button>
  `;
};

const TemplateBoth = () => {
  return html`
    <zen-button>
      Button
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
