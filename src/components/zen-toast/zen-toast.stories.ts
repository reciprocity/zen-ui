import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  variant: {
    name: 'Variant',
    description: 'Toast variant',
    defaultValue: 'success',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'success' },
    },
    type: { name: 'string', required: true },
    control: {
      type: 'select',
      options: ['success', 'Info', 'Warning', 'Error'],
    },
  },
  toastTitle: {
    name: 'Title',
    description: 'Toast title',
    defaultValue: 'Success',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
    type: { name: 'string', required: true },
    control: { type: 'text' },
  },
  toastMessage: {
    name: 'Message',
    description: 'Toast message',
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
    description: 'Toast hide duration ',
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
    description: 'Show close toast icon',
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
  title: 'Components/Zen Toast',
  component: 'zen-toast',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ variant, toastTitle, toastMessage, dismissDuration, dismiss }) => {
  return html`<zen-toast
    variant=${variant}
    toast-title=${toastTitle}
    toast-message=${toastMessage}
    dismiss-duration=${dismissDuration}
    dismiss=${dismiss}
  /> `;
};

const TemplateSuccess = () => {
  return html`<zen-toast
    variant="success"
    toast-title="Success"
    toast-message="Settings successfully saved!"
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateInfo = () => {
  return html`<zen-toast
    variant="info"
    toast-title="Info"
    toast-message="You have 6 items that need your attention!"
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateWarning = () => {
  return html`<zen-toast
    variant="warning"
    toast-title="Warning"
    toast-message="Proceed with caution. Any changes will
  lead to the recalculation of the risk ratings and scores accross the entire risk register."
    dismiss-duration="none"
    dismiss="true"
  />`;
};

const TemplateError = () => {
  return html`<zen-toast
    variant="error"
    toast-title="Error"
    toast-message="Oops, something went wrong."
    dismiss-duration="none"
    dismiss="true"
  />`;
};

export const Default = Template.bind({});
export const SuccessToastStory = TemplateSuccess.bind({});
export const InfoToastStory = TemplateInfo.bind({});
export const WarningToastStory = TemplateWarning.bind({});
export const ErrorToastStory = TemplateError.bind({});
