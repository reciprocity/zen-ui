import { newSpecPage } from '@stencil/core/testing';
import { ZenSortable } from '../zen-sortable';

describe('zen-sortable', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenSortable],
      html: `<zen-sortable>Content</zen-sortable>`,
    });

    expect(page.root).toBeTruthy();
  });
});
