import { newSpecPage } from '@stencil/core/testing';

import { ZenCard } from '../zen-card';

describe('zen-card', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenCard],
      html: `<zen-card>Content</zen-card>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });
});
