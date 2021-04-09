import { mutationObserverMock } from '../../helpers/jest';
global.MutationObserver = mutationObserverMock();

import { newSpecPage } from '@stencil/core/testing';
import { ZenTable } from '../zen-table';

describe('zen-table', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTable],
      html: `<zen-table columns="1fr">Content</zen-table>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });
});
