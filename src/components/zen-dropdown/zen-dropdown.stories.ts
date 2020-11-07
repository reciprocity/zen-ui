import { html } from 'lit-html';
import markdown from './readme.md';
import { eventHandles, action } from '../../../.storybook/helpers/custom-action';

const customEvents = ['input2'];
const events = [...eventHandles(customEvents)];

export default {
  title: 'Components/Zen Dropdown',
  component: 'zen-dropdown',
  parameters: {
    notes: {markdown},
    actions: {
      handles: events,
    },
  },
};

// https://storybook.js.org/docs/react/essentials/controls#annotation
const argTypes = {
  selectedColor: {
    control: 'color',
  },
};

const Template = (
  {
    selectedColor,
  }) => {
    const opts = [{ label: 'item 1' }, { label: 'item 2' }];
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
Default.argTypes = {...argTypes};
