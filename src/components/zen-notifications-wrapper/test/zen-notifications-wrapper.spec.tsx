import { newSpecPage } from '@stencil/core/testing';
import { ZenNotificationsWrapper } from '../zen-notifications-wrapper';

describe('zen-notifications-wrapper', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenNotificationsWrapper],
      html: `<zen-notifications-wrapper></zen-notifications-wrapper>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
