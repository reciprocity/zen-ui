import { html } from 'lit-html';
import markdown from './readme.md';
import { eventHandles, action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['zenInput'];
const events = [...eventHandles(customEvents)];

const argTypes = {
  selectedColor: {
    type: { name: 'string', required: false },
    description: 'color of selected item',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '#f00' },
    },
    control: {
      type: 'color',
    },
  },
};

export default {
  title: 'Components/Zen Dropdown',
  component: 'zen-dropdown',
  argTypes,
  parameters: {
    notes: { markdown },
    actions: {
      handles: events,
    },
  },
};

const Template = ({ selectedColor }) => {
  const opts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => ({
    label: `item ${n}`,
  }));
  return html`
    <zen-dropdown
      class="my-96"
      style="max-width: 300px;"
      value=${opts[2].label}
      .options=${opts}
      selected-color=${selectedColor}
    >
    </zen-dropdown>
    ${action('zen-dropdown', customEvents)}
  `;
};

export const Default = Template.bind({});

export const DrugiStory = Template.bind({});
export const TretjiStory = Template.bind({});
