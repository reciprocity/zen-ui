import { newSpecPage } from '@stencil/core/testing';
import { ZenNotification } from '../zen-notification';

describe('zen-notification', () => {
  it('should set title and message', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading" dismiss-duration="none">Test Message</zen-notification>`,
    });
    expect(page.root.shadowRoot.querySelector('.title').textContent).toEqual('Test Heading');
    expect(page.root.shadowRoot.querySelector('slot')).not.toBeNull();
  });

  it('should display button to dismiss notification', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading" dismiss-duration="none">Test Message</zen-notification>`,
    });

    expect(page.root.shadowRoot.querySelector('.close')).not.toBeNull();
  });
});
