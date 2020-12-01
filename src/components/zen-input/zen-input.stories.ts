import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
};

export default {
  title: 'Components/Zen Input',
  component: 'zen-input',
  argTypes,
  parameters: {
    notes: {markdown},
  },
};

const Template = () => {
    return html`
    <zen-input label="Username" supporting-text="This field should be unique" placeholder="Insert text here..." required />
    `;
};

const TemplateAlone = () => {
    return html`
    <zen-input />
    `;
};

const TemplateAloneWithPlaceholder = () => {
    return html`
    <zen-input placeholder="Insert text here..." />
    `;
};

const TemplateDisabled = () => {
    return html`
    <zen-input placeholder="Disabled text here..." disabled />
    `;
};

const TemplateDisabledWithSupportingText = () => {
    return html`
    <zen-input supporting-text="This field should be unique" placeholder="Disabled text here..." disabled />
    `;
};

const TemplateDisabledWithLabel = () => {
    return html`
    <zen-input label="Username" placeholder="Disabled text here..." disabled />
    `;
};

const TemplateRequired = () => {
  return html`
  <zen-input label="Username" supporting-text="This field should be unique" placeholder="Insert text here..." required />
  `;
};


export const Default = Template.bind({});
export const SimpleInput = TemplateAlone.bind({});
export const SimpleInputWithPlaceholder = TemplateAloneWithPlaceholder.bind({});
export const DisabledInput = TemplateDisabled.bind({});
export const DisabledInputWithLabel = TemplateDisabledWithLabel.bind({});
export const DisabledInputWithSupportingText = TemplateDisabledWithSupportingText.bind({});
export const RequiredInput = TemplateRequired.bind({});
