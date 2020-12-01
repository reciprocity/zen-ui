import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
};

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
    <zen-form-group />
        <zen-input-label  text="Username"></zen-input-label>
        <zen-input ></zen-input>
        <zen-input-support-text text="This field should be unique"></zen-input-support-text>
    </zen-form-group>
    `;
};


export const Default = Template.bind({});
