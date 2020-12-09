import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {};

export default {
  title: 'Components/Zen Form Group',
  component: 'zen-form-group',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = () => {
  return html`
    <zen-form-group>
      <zen-label label="Username" required></zen-label>
      <zen-input></zen-input>
      <zen-input-support-text text="This field should be unique"></zen-input-support-text>
    </zen-form-group>
  `;
};

const TemplateSimple = () => {
  return html`
    <zen-form-group>
      <zen-label label="Username"></zen-label>
      <zen-input></zen-input>
      <zen-input-support-text text="This field should be unique"></zen-input-support-text>
    </zen-form-group>
  `;
};

const TemplateWithLabel = () => {
  return html`
    <zen-form-group>
      <zen-label label="Username"></zen-label>
      <zen-input></zen-input>
    </zen-form-group>
  `;
};

const TemplateWithLabelRequired = () => {
  return html`
    <zen-form-group>
      <zen-label label="Username" required></zen-label>
      <zen-input required></zen-input>
    </zen-form-group>
  `;
};

const TemplateWithSupportText = () => {
  return html`
    <zen-form-group>
      <zen-input></zen-input>
      <zen-input-support-text text="This field should be unique"></zen-input-support-text>
    </zen-form-group>
  `;
};

const TemplateWithLabelAndTextarea = () => {
  return html`
    <zen-form-group>
      <zen-label label="Describe yourself"></zen-label>
      <zen-textarea placeholder="Write here..."></zen-textarea>
      <zen-input-support-text text="0 of 2500 characters"></zen-input-support-text>
    </zen-form-group>
  `;
};

const FullTemplate = () => {
  return html`
    <zen-form-group>
      <zen-label label="Full name"></zen-label>
      <zen-input></zen-input>
    </zen-form-group>
    <zen-form-group>
      <zen-label label="Username" required></zen-label>
      <zen-input required></zen-input>
      <zen-input-support-text text="This field should be unique"></zen-input-support-text>
    </zen-form-group>
    <zen-form-group>
      <zen-label label="Password" required></zen-label>
      <zen-input required></zen-input>
      <zen-input-support-text text="Between 6 and 18 characters"></zen-input-support-text>
    </zen-form-group>
    <zen-form-group>
      <zen-label label="Optional configurations"></zen-label>
      <zen-checkbox label="Remember me?"></zen-checkbox>
      <zen-checkbox label="Keep session alive" checked></zen-checkbox>
      <zen-checkbox label="Render components using Stencil"></zen-checkbox>
    </zen-form-group>
    <zen-form-group>
      <zen-label label="Describe yourself"></zen-label>
      <zen-textarea placeholder="Write here..."></zen-textarea>
      <zen-input-support-text text="0 of 2500 characters"></zen-input-support-text>
    </zen-form-group>
    <zen-button label="Sign up"></zen-button>
  `;
};

export const Default = Template.bind({});
export const FormGroupWithLabelAndSupportText = TemplateSimple.bind({});
export const FormGroupWithLabel = TemplateWithLabel.bind({});
export const FormGroupWithLabelRequired = TemplateWithLabelRequired.bind({});
export const FormGroupWithSupportText = TemplateWithSupportText.bind({});
export const FormGroupWithLabelAndTextarea = TemplateWithLabelAndTextarea.bind({});
export const FormGroupWithAllElements = FullTemplate.bind({});
