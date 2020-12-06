import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  variant: {
    name: 'Variant',
    description: 'Toast variant',
    defaultValue: 'success',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'Success' },
    },
    type: { name: 'string', required: true },
    control: {
      type: 'select',
      options: ['success', 'info', 'warning', 'error'],
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
  timeout: {
    name: 'Timeout',
    description: 'Toast hide timeout ',
    defaultValue: 5000,
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: '5000' },
    },
    type: { name: 'number', required: false },
    control: { type: 'range', min: 0, max: 10000, step: 1000 },
  },
  disableTimeout: {
    name: 'Disable Timeout',
    description: 'Dont hide toast',
    defaultValue: true,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
    type: { name: 'boolean', required: false },
    control: { type: 'boolean' },
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

const Template = ({ variant, toastTitle, toastMessage, timeout, disableTimeout, dismiss }) => {
  timeout = !disableTimeout ? timeout : null;
  return html`<zen-toast
    variant=${variant}
    toast-title=${toastTitle}
    toast-message=${toastMessage}
    timeout=${timeout}
    dismiss=${dismiss}
  /> `;
};

const TemplateSuccess = () => {
  return html`<zen-toast
    variant="success"
    toast-title="Success"
    toast-message="Settings successfully saved!"
    timeout="null"
    dismiss="true"
  />`;
};

const TemplateInfo = () => {
  return html`<zen-toast
    variant="info"
    toast-title="Info"
    toast-message="You have 6 items that need your attention!"
    timeout="null"
    dismiss="true"
  />`;
};

const TemplateWarning = () => {
  return html`<zen-toast
    variant="warning"
    toast-title="Warning"
    toast-message="Proceed with caution. Any changes will lead to the recalculation of the risk ratings and scores accross the entire risk register."
    timeout="null"
    dismiss="true"
  />`;
};

const TemplateError = () => {
  return html`<zen-toast
    variant="error"
    toast-title="Error"
    toast-message="Oops, something went wrong."
    timeout="null"
    dismiss="true"
  />`;
};

export const Default = Template.bind({});
export const SuccessToastStory = TemplateSuccess.bind({});
export const InfoToastStory = TemplateInfo.bind({});
export const WarningToastStory = TemplateWarning.bind({});
export const ErrorToastStory = TemplateError.bind({});
