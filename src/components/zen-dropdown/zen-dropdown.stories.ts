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

const Template = ({ options, value, closeOnSelect }) => {
  return html`
    <zen-dropdown
      id="default-dropdown"
      class="my-80"
      style="max-width: 300px;"
      value=${value}
      .options=${options}
      close-on-select=${closeOnSelect}
    />
    ${action('#default-dropdown', customEvents)}
  `;
};

const SlottedTemplate = ({ options }) => {
  interface ZenDropdownHTMLElement extends HTMLElement {
    value: string;
    close: () => void;
  }

  function dropdown(): ZenDropdownHTMLElement {
    return document.querySelector('#dropdown-with-options-slot') as ZenDropdownHTMLElement;
  }

  function onOptionClick(option) {
    dropdown().value = option.label;
    dropdown().close();
  }

  return html`
    <style>
      .separator {
        margin-top: 1rem;
        border-bottom: 1px solid;
        color: #0078cd;
        padding: 0 1rem;
      }
    </style>
    <zen-dropdown
      id="dropdown-with-options-slot"
      class="my-80"
      style="max-width: 300px;"
      value=${options[2].label}
      .options=${options}
    >
      <div slot="options">
        <div class="separator">Some custom title</div>
        ${options.map(
          item =>
            html`<zen-menu-item
              label=${item.label}
              @click="${() => {
                onOptionClick(item);
              }}"
            ></zen-menu-item>`,
        )}
      </div>
    </zen-dropdown>
    ${action('#dropdown-with-options-slot', customEvents)}
  `;
};

export const Default = Template.bind({});
Default.args = {
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
    label: `item ${n}`,
  })),
  value: 'item 2',
  closeOnSelect: true,
};

export const DropdownWithManuallyRenderedOptions = SlottedTemplate.bind({});
DropdownWithManuallyRenderedOptions.args = {
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => ({
    label: `item ${n}`,
  })),
};
