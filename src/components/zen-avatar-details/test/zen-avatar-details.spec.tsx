import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarDetails } from '../zen-avatar-details';

describe('zen-avatar-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarDetails],
      html: `<zen-avatar-details></zen-avatar-details>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-avatar-details>
    `);
  });
});
