import { html } from 'lit-html';
import markdown from './readme.md';

const argTypes = {
  variant: {
    control: {
      type: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
  },
  dismissDuration: {
    control: {
      type: 'select',
      options: ['none', 'short', 'medium', 'long'],
    },
  },
};

export default {
  title: 'Notifications/Notification',
  component: 'zen-notification',
  argTypes,
  parameters: {
    notes: { markdown },
  },
};

const Template = ({ variant, heading, message, dismissDuration, dismiss }) => {
  return html`<zen-notification
    variant=${variant}
    heading=${heading}
    message=${message}
    dismiss-duration=${dismissDuration}
    dismiss=${dismiss}
  /> `;
};

const TemplateVariant = () => {
  return html`<div>
      <zen-notification
        variant="success"
        heading="Success"
        message="Settings successfully saved!"
        dismiss-duration="none"
        dismiss="true"
      />
    </div>
    <div>
      <zen-notification
        variant="info"
        heading="Info"
        message="You have 6 items that need your attention!"
        dismiss-duration="none"
        dismiss="true"
      />
    </div>
    <div>
      <zen-notification
        variant="warning"
        heading="Warning"
        message="Proceed with caution. Any changes will
      lead to the recalculation of the risk ratings and scores accross the entire risk register."
        dismiss-duration="none"
        dismiss="true"
      />
    </div>
    <div>
      <zen-notification
        variant="error"
        heading="Error"
        message="Oops, something went wrong."
        dismiss-duration="none"
        dismiss="true"
      />
    </div>`;
};

export const Default = Template.bind({});
Default.args = {
  variant: 'success',
  heading: 'Success',
  message: 'Settings successfully saved!',
  dismissDuration: 'none',
  dismiss: false,
};
export const NotificationVariants = TemplateVariant.bind({});
