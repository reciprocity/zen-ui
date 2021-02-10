import { newSpecPage } from '@stencil/core/testing';
import { ZenNotification } from '../zen-notification';

describe('Test parameters rendering', () => {
  it.each(['success', 'info', 'warning', 'error'])('Test that variant %s is applied correctly', async variant => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification variant="${variant}" />`,
    });
    const className = '.notification-' + variant;
    expect(page.root.shadowRoot.querySelector(className)).not.toBeNull();
  });

  it('Test that parameters are set correctly', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading" message="Test Message"></zen-notification>`,
    });

    expect(page.root.shadowRoot.querySelector('.title').textContent).toEqual('Test Heading');
    expect(page.root.shadowRoot.querySelector('.content').textContent).toEqual('Test Message');
  });

  it('Test that notification can be dismissed', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading" message="Test Message"></zen-notification>`,
    });

    expect(page.root.shadowRoot.querySelector('.close')).not.toBeNull();
  });
});
