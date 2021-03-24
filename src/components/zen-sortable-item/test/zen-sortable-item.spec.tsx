import { newSpecPage } from '@stencil/core/testing';
import { ZenSortableItem } from '../zen-sortable-item';

describe('zen-sortable-item', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenSortableItem],
      html: `<zen-sortable-item>Content</zen-sortable-item>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });
});
