import { newSpecPage } from '@stencil/core/testing';
import { ZenNotificationsWrapper } from '../zen-notifications-wrapper';

describe('zen-notifications-wrapper', () => {
  beforeEach(() => {
    delete global.window.ZenUINotificationsWrapper;
  });

  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenNotificationsWrapper],
      html: `<zen-notifications-wrapper></zen-notifications-wrapper>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should display notification', async () => {
    const page = await newSpecPage({
      components: [ZenNotificationsWrapper],
      html: `<zen-notifications-wrapper></zen-notifications-wrapper>`,
    });

    const notification = {
      heading: 'Title',
      content: 'Content',
      variant: 'success',
      position: 'top-left',
    };

    page.rootInstance.displayNotification(notification);

    expect(page.root.querySelector('zen-notification').getAttribute('heading')).toBe('Title');
    expect(page.root.querySelector('zen-notification').getAttribute('variant')).toBe('success');
    expect(page.root.querySelector('zen-notification').innerText).toBe('Content');
  });

  it('should avoid rendering if notification wrapper already exists', async () => {
    const page = await newSpecPage({
      components: [ZenNotificationsWrapper],
      html: `<zen-notifications-wrapper></zen-notifications-wrapper>`,
    });

    global.window.ZenUINotificationsWrapper = page.rootInstance;
    await page.waitForChanges();
    const result = page.rootInstance.render();

    expect(result).toBe(null);
  });
});
