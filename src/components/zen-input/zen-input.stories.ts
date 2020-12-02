import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Components/Zen Input',
  component: 'zen-input',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = () => {
  return html` <zen-input placeholder="Insert text here..." /> `;
};

const TemplateAlone = () => {
  return html` <zen-input /> `;
};

const TemplateAloneWithPlaceholder = () => {
  return html` <zen-input placeholder="Insert text here..." /> `;
};

const TemplateDisabled = () => {
  return html` <zen-input placeholder="Disabled text here..." disabled /> `;
};

const TemplateRequired = () => {
  return html` <zen-input placeholder="Insert text here..." required /> `;
};

export const Default = Template.bind({});
export const SimpleInput = TemplateAlone.bind({});
export const SimpleInputWithPlaceholder = TemplateAloneWithPlaceholder.bind({});
export const DisabledInput = TemplateDisabled.bind({});
export const RequiredInput = TemplateRequired.bind({});
