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
    <zen-dropdown
      id="default-dropdown"
      class="my-96"
      style="max-width: 300px;"
      value=${opts[2].label}
      .options=${opts}
    />
    ${action('#default-dropdown', customEvents)}
  `;
};

const SlottedTemplate = () => {
  const opts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => ({
    label: `item ${n}`,
  }));

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
      class="my-96"
      style="max-width: 300px;"
      value=${opts[2].label}
      .options=${opts}
    >
      <div slot="options">
        <div class="separator">Some custom title</div>
        ${opts.map(
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

export const Slotted = SlottedTemplate.bind({});
