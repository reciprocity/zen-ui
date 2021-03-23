import { newSpecPage } from '@stencil/core/testing';
import { ZenSkeleton } from '../zen-skeleton';

describe('zen-skeleton', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenSkeleton],
      html: `<zen-skeleton></zen-skeleton>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
