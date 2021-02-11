import { newSpecPage } from '@stencil/core/testing';
import { ZenTableCell } from '../zen-table-cell';

describe('zen-table-cell', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTableCell],
      html: `<zen-table-cell>Content</zen-table-cell>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });
});
