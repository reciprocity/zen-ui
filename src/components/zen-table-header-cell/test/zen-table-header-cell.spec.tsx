import { newSpecPage } from '@stencil/core/testing';
import { ZenTableHeaderCell } from '../zen-table-header-cell';

describe('zen-table-header-cell', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeaderCell],
      html: `<zen-table-header-cell>Content</zen-header-table-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <zen-table-header-cell>
        <mock:shadow-root>
          <slot>
          </slot>
        </mock:shadow-root>
        Content
      </zen-table-header-cell>
    `);
  });

  it.only('applies `sticky` class to host element if `sticky` prop is set', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeaderCell],
      html: `<zen-table-header-cell sticky>Content</zen-table-header-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <zen-table-header-cell class="sticky" sticky="">
        <mock:shadow-root>
          <slot>
          </slot>
        </mock:shadow-root>
        Content
      </zen-table-header-cell>
    `);
  });
});
