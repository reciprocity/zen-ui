import { newSpecPage } from '@stencil/core/testing';
import { ZenTooltip } from '../zen-tooltip';

describe('zen-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip></zen-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-tooltip class="dark tooltip top" style="max-height: none;">
        <mock:shadow-root>
          <slot></slot>
          <div class="arrow dark top"></div>
        </mock:shadow-root>
      </zen-tooltip>
    `);
  });
});
