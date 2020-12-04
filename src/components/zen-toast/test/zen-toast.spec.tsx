import { newSpecPage } from '@stencil/core/testing';
import { ZenToast } from '../zen-toast';

describe('zen-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenToast],
      html: `<zen-toast></zen-toast>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-toast>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-toast>
    `);
  });
});
