import { html } from 'lit-html';
import markdown from './readme.md';
import { eventHandles, action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['zenInput'];
const events = [...eventHandles(customEvents)];

const argTypes = {};

export default {
  title: 'Dropdown/_Dropdown',
  component: 'zen-dropdown',
  argTypes,
  parameters: {
    notes: { markdown },
    actions: {
      handles: events,
    },
  },
};

const Template = () => {
  const opts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => ({
    label: `item ${n}`,
  }));
  return html`
    <zen-dropdown class="my-96" style="max-width: 300px;" value=${opts[2].label} .options=${opts} />
    ${action('zen-dropdown', customEvents)}
  `;
};

export const Default = Template.bind({});

export const DrugiStory = Template.bind({});
export const TretjiStory = Template.bind({});
