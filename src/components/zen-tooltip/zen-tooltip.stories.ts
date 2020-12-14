import { html } from 'lit-html';
import markdown from './readme.md';
import { Position, Variant } from './types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
library.add(faTrash);

const argTypes = {
  position: {
    control: { type: 'select', options: Object.keys(Position).map(n => Position[n]) },
  },
  variant: {
    control: { type: 'select', options: Object.keys(Variant).map(n => Variant[n]) },
  },
  text: {
    control: { type: 'text' },
  },
};

export default {
  title: 'Components/Zen Tooltip',
  component: 'zen-tooltip',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ position, text, variant }) => {
  return html`
    <div style="text-align: center; margin-top: 8rem; margin-bottom: 8rem;">
      <zen-button label="Apply changes"></zen-button>
      <zen-tooltip position="${position}" variant="${variant}" text="${text}"></zen-tooltip>
    </div>
  `;
};

const TemplateSlot = () => {
  return html`
    <div style="text-align: center; margin-top: 8rem;">
      <div>Tooltip</div>
      <zen-tooltip position="top" variant="light" text="Override text">
        <div slot="text"><b>This is a HTML content</b></div>
      </zen-tooltip>
    </div>
  `;
};

const TemplateVariants = () => {
  return html`
    <table style="width: 100%; height: 400px; table-layout: fixed; ">
      <tr>
        <td style="text-align: center;">
          <zen-button label="Edit" variant="primary"></zen-button>
          <zen-tooltip position="top" text="The Manager can edit and create in the context of the PCI-DSS framework.">
          </zen-tooltip>
        </td>
        <td style="text-align: center;">
          <zen-button label="Info" variant="secondary"></zen-button>
          <zen-tooltip position="top" variant="light" text="This is a information tooltip."></zen-tooltip>
        </td>
        <td style="text-align: center;">
          <zen-button label="Delete" variant="destructive"></zen-button>
          <zen-tooltip position="top" variant="error" text="Are you sure you want to delete the object!"></zen-tooltip>
        </td>
      </tr>
    </table>
  `;
};

export const Default = Template.bind({});
Default.args = {
  position: Position.TOP,
  variant: Variant.DARK,
  text:
    'The Manager can edit and create in the context of the PCI-DSS framework. They can also grant access to the framework to additional teammates.',
  offset: 10,
};

export const TooltipWithHTMLContent = TemplateSlot.bind({});
export const TooltipVariants = TemplateVariants.bind({});
