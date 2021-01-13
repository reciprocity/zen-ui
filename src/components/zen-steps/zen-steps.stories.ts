import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  activeIndex: {
    control: { type: 'range', min: -1, max: 4, step: 1 },
  },
};

export default {
  title: 'Navigation/Steps',
  component: 'ZenSteps',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ steps, activeIndex, clickable }) => {
  let stepsArr = [];
  try {
    stepsArr = JSON.parse(steps);
  } catch (error) {
    stepsArr = [];
  }
  return html` <zen-steps .steps=${stepsArr} active-index=${activeIndex} clickable=${clickable} /> `;
};

export const Default = Template.bind({});
Default.args = {
  activeIndex: 1,
  clickable: 'completed',
  steps: JSON.stringify([
    { label: 'Choose framework', completed: true },
    { label: 'Select objectives', completed: true },
    { label: 'Invite teammates', completed: true },
    { label: 'Launch' },
  ]),
};
