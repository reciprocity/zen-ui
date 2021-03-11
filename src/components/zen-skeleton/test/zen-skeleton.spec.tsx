import { newSpecPage } from '@stencil/core/testing';
import { ZenSkeleton } from '../zen-skeleton';

describe('zen-skeleton', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSkeleton],
      html: `<zen-skeleton></zen-skeleton>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-skeleton>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-skeleton>
    `);
  });
});
