import { newSpecPage } from '@stencil/core/testing';
import { ZenTable } from '../zen-table';

describe('zen-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTable],
      html: `<zen-table>Content</zen-table>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });
});
