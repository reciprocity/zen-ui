import { html } from 'lit-html';
import markdown from './readme.md';
import icon from '../../img/reci-icon-g.png';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { litHtmlIcon, styles } from '../helpers/fa-icons';

const argTypes = {};

export default {
  title: 'Dropdown/Option',
  component: 'zen-option',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ selected, label, focused }) => {
  return html` <zen-option ?selected=${selected} ?focused=${focused} label=${label} />`;
};

export const Default = Template.bind({});
Default.args = {
  selected: false,
  focused: false,
  label: 'My option item',
};

const SlottedTemplate = () => {
  return html`<style>
      ${styles} .icon {
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
    </style>

    <zen-option default-padding="false">
      <div class="content" slot="content">
        <img class="icon" src=${icon} alt="icon" />
        <b>Custom content</b>
        <span style="margin-left: auto" .innerHTML="${litHtmlIcon(faCheck)}"></span>
      </div>
    </zen-option>`;
};

export const CustomContentSlot = SlottedTemplate.bind({});
