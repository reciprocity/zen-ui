export default {
  title: 'Components/My Component',
  component: 'my-component',
};

const Template = () => {
  return `
  <my-component
    first="Jan" middle="B" last="Savli">sdjfhdf
  </my-component>`;
};

export const Default = Template.bind({});
