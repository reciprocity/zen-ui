import { html } from 'lit-html';

export default {
  title: 'Components/Zen Dropdown',
  component: 'zen-dropdown',
};

const Template = () => {
  return html`
  <zen-dropdown
    options="${[{ label: '1' }, { label: '2' }]}"
  </zen-dropdown>`;
};

export const Default = Template.bind({});


export const TextWithAction = () => {
  const dropdown = document.createElement('zen-dropdown');
  dropdown.options = [{ label: 'item 1' }, { label: 'item 2' }];
  return dropdown;
};