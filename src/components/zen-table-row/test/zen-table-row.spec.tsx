import { newSpecPage } from '@stencil/core/testing';
import { ZenTableRow } from '../zen-table-row';

describe('zen-table-row', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTableRow],
      html: `<zen-table-row>Content</zen-table-row>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });

  it('should render checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenTableRow],
      html: `<zen-table-row selectable>
                <zen-table-cell>Row 1, Cell 1</zen-table-cell>
                <zen-table-cell>Row 1, Cell 2</zen-table-cell>
            </zen-table-row>`,
    });

    expect(page.root.shadowRoot.querySelector('zen-checkbox')).toBeTruthy();
  });
});
