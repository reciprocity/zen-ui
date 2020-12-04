import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Components/Zen Toast',
  component: 'zen-toast',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = () => {
  return html`<zen-toast></zen-toast> `;
};

const TemplateSuccess = () => {
  return html`<zen-toast
    variant="success"
    toast-title="Success"
    toast-message="Settings successfully saved!"
  ></zen-toast>`;
};

const TemplateInfo = () => {
  return html`<zen-toast
    variant="info"
    toast-title="Info"
    toast-message="You have 6 items that need your attention!"
  ></zen-toast>`;
};

const TemplateWarning = () => {
  return html`<zen-toast
    variant="warning"
    toast-title="Warning"
    toast-message="Proceed with caution. Any changes will lead to the recalculation of the risk ratings and scores accross the entire risk regiter."
  ></zen-toast>`;
};

const TemplateError = () => {
  return html`<zen-toast variant="error" toast-title="Error" toast-message="Oops, something went wrong."></zen-toast>`;
};

export const Default = Template.bind({});
export const SuccessToastStory = TemplateSuccess.bind({});
export const InfoToastStory = TemplateInfo.bind({});
export const WarningToastStory = TemplateWarning.bind({});
export const ErrorToastStory = TemplateError.bind({});
