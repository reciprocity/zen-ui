import { newSpecPage } from '@stencil/core/testing';
import { ZenMenu } from '../zen-menu';

describe('zen-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenMenu],
      html: `<zen-menu></zen-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-menu>
    `);
  });
});
