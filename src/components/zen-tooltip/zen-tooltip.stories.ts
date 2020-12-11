import { html } from 'lit-html';
import markdown from './readme.md';
import { Position, Variant } from './types';

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
    <div style="display: block;text-align: center; padding-top: 10rem; padding-bottom: 10rem">
      <label>Tooltip</label>
      <zen-tooltip position="${position}" variant="${variant}" text="${text}"> </zen-tooltip>
    </div>
  `;
};

const TemplateSlot = () => {
  return html`
    <label style="cursor: pointer;">Tooltip</label>
    <zen-tooltip position="bottom" text="Override text">
      <div slot="text"><b>This is a HTML content</b></div>
    </zen-tooltip>
  `;
};

const TemplateAlert = () => {
  return html`
    <label>Tooltip</label>
    <zen-tooltip
      position="bottom"
      variant="error"
      text="The Manager can edit and create in the context of the PCI-DSS framework. They can also grant access to the
        framework to additional teammates."
    >
    </zen-tooltip>
  `;
};

export const Default = Template.bind({});
Default.args = {
  position: Position.TOP,
  variant: Variant.DEFAULT,
  text:
    'The Manager can edit and create in the context of the PCI-DSS framework. They can also grant access to the framework to additional teammates.',
};

export const TooltipWithHTMLContent = TemplateSlot.bind({});
export const TooltipVariantAlert = TemplateAlert.bind({});
