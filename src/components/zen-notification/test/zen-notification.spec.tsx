import { newSpecPage } from '@stencil/core/testing';
import { ZenNotification } from '../zen-notification';

describe('zen-notification', () => {
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
      html: `<zen-notification heading="Test Heading" dismiss="true">Test Message</zen-notification>`,
    });

    expect(page.root.shadowRoot.querySelector('.close')).not.toBeNull();
  });

  it('should call close function', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading" dismiss="true">Test Message</zen-notification>`,
    });
    page.rootInstance.close = jest.fn();
    page.root.shadowRoot.querySelector<HTMLElement>('.close').click();

    expect(page.rootInstance.close).toHaveBeenCalled();
  });

  it('should dismiss notification', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification heading="Test Heading" dismiss="true">Test Message</zen-notification>`,
    });
    page.rootInstance.close();

    expect(Object.entries(page.rootInstance)).toStrictEqual([]);
  });
});
