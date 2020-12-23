import { html } from 'lit-html';
import markdown from './readme.md';
import { Position, TooltipVariant } from '../helpers/helpers';

const argTypes = {
  position: {
    control: { type: 'select', options: Object.keys(Position).map(n => Position[n]) },
  },
  variant: {
    control: { type: 'select', options: Object.keys(TooltipVariant).map(n => TooltipVariant[n]) },
  },
};

export default {
  title: 'Notifications/Tooltip',
  component: 'zen-tooltip',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ position, variant, label }) => {
  return html`
    <style>
      .wrapper {
        text-align: center;
        margin-top: 8rem;
        margin-bottom: 8rem;
      }
    </style>
    <div class="wrapper">
      <zen-button style="display:inline-block" label="Apply changes" variant="secondary"></zen-button>
      <zen-tooltip position="${position}" variant="${variant}" label="${label}"></zen-tooltip>
    </div>
  `;
};

const TemplateSlot = () => {
  return html`
    <style>
      .row {
        display: flex;
      }
      .column {
        flex-direction: column;
        text-align: left;
        margin-right: 0.7rem;
      }
      .tooltip-title {
        font-size: 0.875rem;
        margin-bottom: 0.2rem;
        font-weight: bold;
      }
      .tooltip-code {
        font-size: 0.75rem;
        margin-bottom: 0.2rem;
      }
      .tooltip-role {
        color: #868e96;
        font-size: 0.625rem;
        font-weight: bold;
        line-height: 1rem;
        text-transform: uppercase;
        margin: 0;
      }
      .profile {
        min-height: 2rem;
        min-width: 2rem;
        max-height: 2rem;
        max-width: 2rem;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        background: #ffdaff;
        text-align: center;
        line-height: 2rem;
        color: #b875c4;
      }
    </style>
    <div style="cursor:pointer; text-align: center; padding-top: 6rem;">
      <span>kim.anderson@reciprocity.com</span>
      <zen-tooltip
        style="max-width: fit-content;"
        always-visible="true"
        position="top"
        variant="light"
        label="Override text"
      >
        <div slot="label" class="row">
          <div class="column profile">KA</div>
          <div class="column">
            <span class="tooltip-title">Kim Anderson</span>
            <p class="tooltip-code">kim.anderson@reciprocitylabs.com</p>
            <p class="tooltip-role">administrator</p>
          </div>
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
        padding-top: 7rem;
        padding-left: 7rem;
        padding-right: 7rem;
        text-align: center;
      }
    </style>
    <div class="container">
      <div>
        <zen-button style="display: block" label="Edit" variant="primary"></zen-button style="display: block">
        <zen-tooltip
          always-visible="true"
          position="top"
          variant="dark"
          label="The Manager can edit and create the PCI-DSS."
        >
        </zen-tooltip>
      </div>
      <div>
        <zen-button label="Info" variant="secondary"></zen-button>
        <zen-tooltip
          always-visible="true"
          position="top"
          variant="light"
          label="This is a information tooltip."
        ></zen-tooltip>
      </div>
      <div>
        <zen-button label="Delete" variant="destructive"></zen-button>
        <zen-tooltip
          always-visible="true"
          position="top"
          variant="error"
          label="Are you sure you want to delete the object!"
        ></zen-tooltip>
      </div>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
  position: Position.TOP,
  variant: TooltipVariant.DARK,
  label: 'The Manager can edit and create in the context of the PCI-DSS framework.',
  offset: 10,
};

export const TooltipWithHTMLContent = TemplateSlot.bind({});
export const TooltipVariants = TemplateVariants.bind({});
