import { newSpecPage } from '@stencil/core/testing';
import { ZenNotification } from '../zen-notification';

describe('zen-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenNotification],
      html: `<zen-notification></zen-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-notification>
    `);
  });
});
