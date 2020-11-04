import { newSpecPage } from '@stencil/core/testing';
import { ZenDropdownSimple } from '../zen-dropdown';

describe('zen-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenDropdownSimple],
      html: `<zen-dropdown></zen-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-dropdown>
    `);
  });
});
