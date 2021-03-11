import { newSpecPage } from '@stencil/core/testing';
import { ZenSkeletonCircle } from '../zen-skeleton-circle';

describe('zen-skeleton-circle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSkeletonCircle],
      html: `<zen-skeleton-circle></zen-skeleton-circle>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-skeleton-circle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-skeleton-circle>
    `);
  });
});
