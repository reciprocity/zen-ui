import { html } from 'lit-html';
import markdown from './readme.md';
import { Position } from './types';

const argTypes = {
  position: {
    control: { type: 'select', options: Object.keys(Position).map(n => Position[n]) },
  },
  text: {
    control: { type: 'text' },
  },
  error: {
    control: { type: 'boolean' },
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

const Template = ({ position, text, error }) => {
  return html`
    <label>Tooltip</label>
    <zen-tooltip position="${position}" text="${text}" error="${error}"> </zen-tooltip>
  `;
};

const TemplateSlot = () => {
  return html`
    <label>Tooltip</label>
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
  arrow: Position.BOTTOM,
  text:
    'The Manager can edit and create in the context of the PCI-DSS framework. They can also grant access to the framework to additional teammates.',
  error: false,
};

export const TooltipWithHTMLContent = TemplateSlot.bind({});
export const TooltipVariantAlert = TemplateAlert.bind({});
