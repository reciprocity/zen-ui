import { html } from 'lit-html';
import markdown from './readme.md';
import { ZenDismissDuration, ZenVariant } from './zen-notification-helper';

const argTypes = {
  variant: {
    name: 'Variant',
    description: 'Variant',
    type: { name: 'string', required: true },
    control: {
      type: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
  },
  heading: {
    name: 'Title',
    description: 'Title',
    type: { name: 'string', required: true },
    control: { type: 'text' },
  },
  message: {
    name: 'Message',
    description: 'Message',
    type: { name: 'string', required: true },
    control: { type: 'text' },
  },
  dismissDuration: {
    name: 'Dismiss duration',
    description: 'Dismiss duration',
    type: { name: 'string', required: false },
    control: {
      type: 'select',
      options: ['none', 'short', 'medium', 'long'],
    },
  },
  dismiss: {
    name: 'Dismiss',
    description: 'Show close icon',
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

const Template = ({ variant, heading, message, dismissDuration, dismiss }) => {
  return html`<zen-notification
    variant=${variant}
    heading=${heading}
    message=${message}
    dismiss-duration=${dismissDuration}
    dismiss=${dismiss}
  /> `;
};

const TemplateSuccess = () => {
  return html`<zen-notification
    variant="success"
    heading="Success"
    message="Settings successfully saved!"
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateInfo = () => {
  return html`<zen-notification
    variant="info"
    heading="Info"
    message="You have 6 items that need your attention!"
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateWarning = () => {
  return html`<zen-notification
    variant="warning"
    heading="Warning"
    message="Proceed with caution. Any changes will
  lead to the recalculation of the risk ratings and scores accross the entire risk register."
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateError = () => {
  return html`<zen-notification
    variant="error"
    heading="Error"
    message="Oops, something went wrong."
    dismiss-duration="none"
    dismiss="true"
  />`;
};

export const Default = Template.bind({});
Default.args = {
  variant: ZenVariant.SUCCESS,
  heading: 'Success',
  message: 'Settings successfully saved!',
  dismissDuration: ZenDismissDuration.NONE,
  dismiss: false,
};
export const SuccessNotificationStory = TemplateSuccess.bind({});
export const InfoNotificationStory = TemplateInfo.bind({});
export const WarningNotificationStory = TemplateWarning.bind({});
export const ErrorNotificationStory = TemplateError.bind({});
