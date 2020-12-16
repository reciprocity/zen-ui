import { html } from 'lit-html';
import markdown from './readme.md';
import { eventHandles, action } from '../../../.storybook/helpers/custom-action';
import icon from '../../img/reci-icon-g.png';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { litHtmlIcon, styles } from '../helpers/fa-icons';
import { Align } from '../helpers/types';

const customEvents = ['zenInput'];
const events = [...eventHandles(customEvents)];

const argTypes = {
  fieldAlign: {
    control: { type: 'select', options: Object.keys(Align).map(n => Align[n]) },
  },
};

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

const Template = ({ options, value, closeOnSelect, borderless, menuWidth, fieldAlign }) => {
  return html`
    <zen-dropdown
      id="default-dropdown"
      class="mb-80"
      style="max-width: 300px;"
      value=${value}
      .options=${options}
      borderless=${borderless}
      close-on-select=${closeOnSelect}
      menu-width=${menuWidth}
      field-align=${fieldAlign}
    />
    ${action('#default-dropdown', customEvents)}
  `;
};

export const Default = Template.bind({});
Default.args = {
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
    label: `item ${n}`,
  })),
  value: 'item 2',
  closeOnSelect: true,
  borderless: false,
  menuWidth: '100%',
  fieldAlign: 'right',
};

const SlottedTemplate = ({ options }) => {
  interface ZenDropdownHTMLElement extends HTMLElement {
    value: string;
    toggle: (open: boolean) => void;
  }

  function dropdown(): ZenDropdownHTMLElement {
    return document.querySelector('#dropdown-with-options-slot') as ZenDropdownHTMLElement;
  }

  function onOptionClick(option) {
    dropdown().value = option.label;
    dropdown().toggle(false);
  }

  return html`
    <style>
      .icon {
        height: 1rem;
        margin-right: 0.5rem;
      }
      .content {
        display: flex;
        align-items: center;
        padding: 1rem;
      }
      zen-option {
        display: inline-block;
        max-width: 300px;
        width: 100%;
      }
      .separator {
        margin-top: 1rem;
        border-bottom: 1px solid;
        color: #0078cd;
        padding: 0 1rem;
      }
      ${styles}
    </style>
    <zen-dropdown
      id="dropdown-with-options-slot"
      class="mb-80"
      style="max-width: 300px;"
      value=${options[2].label}
      .options=${options}
    >
      <div slot="options">
        <div class="separator">Some custom title</div>
        ${options.map((item, index) =>
          index !== 1
            ? html`<zen-option
                label=${item.label}
                @click="${() => {
                  onOptionClick(item);
                }}"
              ></zen-option>`
            : html`<zen-option
                default-padding="false"
                @click="${() => {
                  onOptionClick(item);
                }}"
              >
                <div class="content" slot="content">
                  <img class="icon" src=${icon} alt="icon" />
                  <b>${item.label}</b>
                  <span style="margin-left: auto" .innerHTML="${litHtmlIcon(faCheck)}"></span>
                </div>
              </zen-option>`,
        )}
      </div>
    </zen-dropdown>
    ${action('#dropdown-with-options-slot', customEvents)}
  `;
};

export const DropdownWithManuallyRenderedOptions = SlottedTemplate.bind({});
DropdownWithManuallyRenderedOptions.args = {
  options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => ({
    label: `item ${n}`,
  })),
};
