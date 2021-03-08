import { newSpecPage } from '@stencil/core/testing';
import { ZenNotificationsWrapper } from '../zen-notifications-wrapper';

describe('zen-notifications-wrapper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenNotificationsWrapper],
      html: `<zen-notifications-wrapper></zen-notifications-wrapper>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-notifications-wrapper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-notifications-wrapper>
    `);
  });
});
