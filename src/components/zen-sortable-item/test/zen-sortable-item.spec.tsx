import { newSpecPage } from '@stencil/core/testing';
import { ZenSortableItem } from '../zen-sortable-item';

describe('zen-sortable-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSortableItem],
      html: `<zen-sortable-item></zen-sortable-item>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-sortable-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-sortable-item>
    `);
  });
});
