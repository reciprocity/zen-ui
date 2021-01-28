import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatar } from '../zen-avatar';

describe('zen-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar></zen-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar>
        <mock:shadow-root>
           <slot />
        </mock:shadow-root>
      </zen-avatar>
    `);
  });
});
