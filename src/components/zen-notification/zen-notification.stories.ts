import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  variant: {
    name: 'Variant',
    description: 'Variant',
    defaultValue: 'success',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'success' },
    },
    type: { name: 'string', required: true },
    control: {
      type: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
  },
  nTitle: {
    name: 'Title',
    description: 'Title',
    defaultValue: 'Success',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    type: { name: 'string', required: true },
    control: { type: 'text' },
  },
  nMessage: {
    name: 'Message',
    description: 'Message',
    defaultValue: 'Settings successfully saved!',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    type: { name: 'string', required: true },
    control: { type: 'text' },
  },
  dismissDuration: {
    name: 'Dismiss duration',
    description: 'Dismiss duration',
    defaultValue: 'none',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'medium' },
    },
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['none', 'short', 'medium', 'long'],
    },
  },
  dismiss: {
    name: 'Dismiss',
    description: 'Show close icon',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
    type: { name: 'boolean', required: false },
    control: { type: 'boolean' },
  },
};

export default {
  title: 'Components/Zen Notification',
  component: 'zen-notification',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ variant, nTitle, nMessage, dismissDuration, dismiss }) => {
  return html`<zen-notification
    variant=${variant}
    n-title=${nTitle}
    n-message=${nMessage}
    dismiss-duration=${dismissDuration}
    dismiss=${dismiss}
  /> `;
};

const TemplateSuccess = () => {
  return html`<zen-notification
    variant="success"
    n-title="Success"
    n-message="Settings successfully saved!"
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateInfo = () => {
  return html`<zen-notification
    variant="info"
    n-title="Info"
    n-message="You have 6 items that need your attention!"
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateWarning = () => {
  return html`<zen-notification
    variant="warning"
    n-title="Warning"
    n-message="Proceed with caution. Any changes will
  lead to the recalculation of the risk ratings and scores accross the entire risk register."
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateError = () => {
  return html`<zen-notification
    variant="error"
    n-title="Error"
    n-message="Oops, something went wrong."
    dismiss-duration="none"
    dismiss="true"
  />`;
};

export const Default = Template.bind({});
export const SuccessNotificationStory = TemplateSuccess.bind({});
export const InfoNotificationStory = TemplateInfo.bind({});
export const WarningNotificationStory = TemplateWarning.bind({});
export const ErrorNotificationStory = TemplateError.bind({});
