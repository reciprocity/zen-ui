import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'General',
  argTypes: {
    children: { control: 'text' },
  },
};

const Template = ({ onClick, children }) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = children;
  btn.addEventListener('click', onClick);
  return btn;
};

export const Colors = Template.bind({});
Colors.args = {
  children: 'Button',
  onClick: action('onClick'),
};

export const Spacing = Template.bind({});
Spacing.args = {
  children: '😀 😎 👍 💯',
};

export const Grid = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Trigger Action';
  btn.addEventListener('click', () => action('This was clicked')());
  return btn;
};

Grid.storyName = 'With an action';
Grid.parameters = { notes: 'My notes on a button with emojis' };

export const Misc = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Go to Welcome Story';
  btn.addEventListener('click', linkTo('example-introduction--page'));
  return btn;
};

Misc.storyName = 'button with link to another story';
