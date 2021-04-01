import { newSpecPage } from '@stencil/core/testing';
import { ZenTableHeaderCell } from '../zen-table-header-cell';

describe('zen-table-header-cell', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeaderCell],
      html: `<zen-table-header-cell>Content</zen-header-table-cell>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });
});
