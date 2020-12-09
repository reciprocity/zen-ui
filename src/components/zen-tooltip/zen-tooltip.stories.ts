import { html } from 'lit-html';
import markdown from './readme.md';
import { ArrowPosition } from './types';

const argTypes = {
  arrow: {
    control: { type: 'select', options: Object.keys(ArrowPosition).map(n => ArrowPosition[n]) },
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

const Template = ({ arrow, text, error }) => {
  return html` <zen-tooltip arrow="${arrow}" text="${text}" error="${error}"> </zen-tooltip> `;
};

const TemplateSlot = () => {
  return html`
    <zen-tooltip arrow="bottom" text="Override text">
      <div slot="text"><b>This is a HTML content</b></div>
    </zen-tooltip>
  `;
};

const TemplateAlert = () => {
  return html`
    <zen-tooltip
      arrow="bottom"
      error="true"
      text="The Manager can edit and create in the context of the PCI-DSS framework. They can also grant access to the
        framework to additional teammates."
    >
    </zen-tooltip>
  `;
};

export const Default = Template.bind({});
Default.args = {
  arrow: ArrowPosition.BOTTOM,
  text:
    'The Manager can edit and create in the context of the PCI-DSS framework. They can also grant access to the framework to additional teammates.',
  error: false,
};

export const SlotTooltipStory = TemplateSlot.bind({});
export const AlertTooltipStory = TemplateAlert.bind({});
