import { html } from 'lit-html';

export default {
  title: 'Components/Zen Dropdown',
  component: 'zen-dropdown',
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
    </zen-dropdown>`;
};

export const Default = Template.bind({});
Default.argTypes = {...argTypes};
