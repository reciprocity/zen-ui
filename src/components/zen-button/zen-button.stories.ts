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

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  variant: 'primary',
  loading: false,
  disabled: false,
};
