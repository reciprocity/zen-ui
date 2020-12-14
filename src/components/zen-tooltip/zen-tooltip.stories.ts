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
    <style>
      .wrapper {
        text-align: center;
        margin-top: 8rem;
        margin-bottom: 8rem;
      }
    </style>
    <div class="wrapper">
      <zen-button label="Apply changes" variant="secondary"></zen-button>
      <zen-tooltip position="${position}" variant="${variant}" text="${text}"></zen-tooltip>
    </div>
  `;
};

const TemplateSlot = () => {
  return html`
    <style>
      .info-tooltip--title {
        font-size: 0.875rem;
        margin-bottom: 2px;
        font-weight: bold;
      }
      .info-tooltip--code {
        font-size: 0.75rem;
        margin-bottom: 4px;
      }
      .info-tooltip--role {
        color: #868e96;
        font-size: 0.625rem;
        font-weight: bold;
        line-height: 1rem;
        text-transform: uppercase;
        margin: 0;
      }
    </style>
    <div style="cursor:pointer; text-align: center; padding-top: 6rem;">
      <span>john.doe@reciprocity.com</span>
      <zen-tooltip style="max-width: 400px;" position="top" variant="light" text="Override text">
        <div slot="text" style="text-align: left;">
          <span class="info-tooltip--title">John Doe</span>
          <p class="info-tooltip--code">john.doe@reciprocitylabs.com</p>
          <p class="info-tooltip--role">administrator</p>
        </div>
      </zen-tooltip>
    </div>
  `;
};

const TemplateVariants = () => {
  return html`
    <style>
      .container {
        display: flex;
        justify-content: space-between;
        padding: 5rem;
      }
    </style>
    <div class="container">
      <div>
        <zen-button label="Edit" variant="primary"></zen-button>
        <zen-tooltip position="top" text="The Manager can edit and create in the context of the PCI-DSS framework.">
        </zen-tooltip>
      </div>
      <div>
        <zen-button label="Info" variant="secondary"></zen-button>
        <zen-tooltip position="top" variant="light" text="This is a information tooltip."></zen-tooltip>
      </div>
      <div>
        <zen-button label="Delete" variant="destructive"></zen-button>
        <zen-tooltip position="top" variant="error" text="Are you sure you want to delete the object!"></zen-tooltip>
      </div>
    </div>
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
