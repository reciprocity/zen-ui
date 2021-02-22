import { newSpecPage } from '@stencil/core/testing';
import { ZenDrawer } from '../zen-drawer';

describe('zen-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenDrawer],
      html: `<zen-drawer></zen-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-drawer>
    `);
  });
});
