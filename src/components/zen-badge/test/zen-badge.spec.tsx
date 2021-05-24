import { newSpecPage } from '@stencil/core/testing';
import { ZenBadge } from '../zen-badge';

describe('zen-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenBadge],
      html: `<zen-badge></zen-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-badge>
    `);
  });
});
