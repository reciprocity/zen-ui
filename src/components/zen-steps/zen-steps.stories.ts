import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  activeIndex: {
    control: { type: 'range', min: -1, max: 4, step: 1 },
  },
};

export default {
  title: 'Components/Zen Steps',
  component: 'ZenSteps',
  argTypes,
  parameters: {
    notes: {markdown},
  },
};

const Template = ({ steps, activeIndex }) => {
    let stepsArr = [];
    try {
      stepsArr = JSON.parse(steps);
    } catch (error) {
      stepsArr = [];
    }
    return html`
    <zen-steps
      .steps=${stepsArr}
      active-index=${activeIndex}
    />
    `;
};

export const Default = Template.bind({});
Default.args = {
  activeIndex: 1,
  steps: JSON.stringify([
    { label: 'Choose framework' },
    { label: 'Select objectives' },
    { label: 'Invite teammates' },
    { label: 'Launch' }
  ])
};
