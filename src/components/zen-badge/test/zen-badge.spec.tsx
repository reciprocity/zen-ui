import { newSpecPage } from '@stencil/core/testing';
import { ZenBadge } from '../zen-badge';

describe('zen-badge', () => {
  it('should render badge', async () => {
    const page = await newSpecPage({
      components: [ZenBadge],
      html: `<zen-badge>Content</zen-badge>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });
});
