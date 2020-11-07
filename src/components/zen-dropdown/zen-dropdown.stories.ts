import { html } from 'lit-html';

export default {
  title: 'Components/Zen Dropdown',
  component: 'zen-dropdown',
};

const Template = () => {
  return html`
  <zen-dropdown
    first="Jan" middle="B" last="Savli">sdjfhdf
  </zen-dropdown>`;
};

export const Default = Template.bind({});
