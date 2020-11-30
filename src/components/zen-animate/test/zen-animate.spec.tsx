import { newSpecPage } from '@stencil/core/testing';
import { ZenAnimate } from '../zen-animate';

describe('zen-animate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAnimate],
      html: `<zen-animate></zen-animate>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-animate>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-animate>
    `);
  });
});
