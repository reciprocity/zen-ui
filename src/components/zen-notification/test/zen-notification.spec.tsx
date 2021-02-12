import { newSpecPage } from '@stencil/core/testing';
import { ZenNotification } from '../zen-notification';
import { getDefaultSlotContent } from '../../helpers/helpers';

describe('zen-notification', () => {
  it.each(['success', 'info', 'warning', 'error'])('should correctly apply variant (variant: %s)', async variant => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification variant="${variant}" />`,
    });
    const className = '.notification-' + variant;
    expect(page.root.shadowRoot.querySelector(className)).not.toBeNull();
  });

  it('should set title and message', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading">Test Message</zen-notification>`,
    });
    expect(page.root.shadowRoot.querySelector('.title').textContent).toEqual('Test Heading');
    expect(page.root.shadowRoot.querySelector('slot')).not.toBeNull();
  });

  it('should display button to dismiss notification', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading">Test Message</zen-notification>`,
    });

    expect(page.root.shadowRoot.querySelector('.close')).not.toBeNull();
  });
});
