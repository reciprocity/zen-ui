import { newSpecPage } from '@stencil/core/testing';
import { ZenIcon } from '../zen-icon';

describe('zen-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon></zen-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-icon>
    `);
  });
});
