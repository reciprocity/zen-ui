import { newSpecPage } from '@stencil/core/testing';
import { ZenSkeletonText } from '../zen-skeleton-text';

describe('zen-skeleton-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSkeletonText],
      html: `<zen-skeleton-text></zen-skeleton-text>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-skeleton-text>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-skeleton-text>
    `);
  });
});
