import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Compositions/Input with dropdown',
  component: 'zen-input',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = () => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
    label: `item ${n}`,
  }));
  return html`<zen-input placeholder="Username">
    <zen-dropdown id="default-dropdown" class="mb-80" style="max-width: 300px;" .options=${options} />
  </zen-input>`;
};

export const Default = Template.bind({});
