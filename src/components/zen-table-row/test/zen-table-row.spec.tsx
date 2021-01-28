import { newSpecPage } from '@stencil/core/testing';
import { ZenTableRow } from '../zen-table-row';

describe('zen-table-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTableRow],
      html: `<zen-table-row>Content</zen-table-row>`,
    });

    expect(page.root).toEqualHtml(`
      <zen-table-row>
        <mock:shadow-root>
          <slot>
          </slot>
        </mock:shadow-root>
        Content
      </zen-table-row>
    `);
  });
});
