import { newSpecPage } from '@stencil/core/testing';
import { ZenToggle } from '../zen-toggle';

describe('zen-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle></zen-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-toggle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-toggle>
    `);
  });
});
