import { newSpecPage } from '@stencil/core/testing';
import { ZenTree } from '../zen-tree';

describe('zen-tree', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTree],
      html: `<zen-tree></zen-tree>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-tree>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-tree>
    `);
  });
});
