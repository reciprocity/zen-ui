import { html } from 'lit-html';
import markdown from './readme.md';
import { eventHandles, action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['input2'];
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
      type: 'color'
    }
  },
};

export default {
  title: 'Components/Zen Dropdown',
  component: 'zen-dropdown',
  argTypes,
  parameters: {
    notes: {markdown},
    actions: {
      handles: events,
    },
  },
};

const Template = (
  {
    selectedColor,
  }) => {
    const opts = [{ label: 'item 12' }, { label: 'item 2' }];
    return html`
    <zen-dropdown
      style="max-width: 300px"
      .options=${opts}
      selected-color=${selectedColor}
    </zen-dropdown>
    ${action('zen-dropdown', customEvents)}
    `;
};

export const Default = Template.bind({});
