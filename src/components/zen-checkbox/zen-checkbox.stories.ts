import { html } from 'lit-html';
import markdown from './readme.md';

export default {
  title: 'Forms/Checkbox',
  component: 'zen-checkbox',
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ label, checked, required, disabled }) => {
  return html`<zen-checkbox checked=${checked} disabled=${disabled} required=${required}>${label}</zen-checkbox>`;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  checked: false,
  disabled: false,
  required: false,
};
