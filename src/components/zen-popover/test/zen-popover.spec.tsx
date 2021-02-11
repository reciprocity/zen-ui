import { newSpecPage } from '@stencil/core/testing';
import { ZenPopover } from '../zen-popover';

describe('zen-popover', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenPopover],
      html: `<zen-popover></zen-popover>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-popover>
    `);
  });
});
