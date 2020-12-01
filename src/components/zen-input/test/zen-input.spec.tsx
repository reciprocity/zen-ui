import { newSpecPage } from '@stencil/core/testing';
import { ZenInput } from '../zen-input';

describe('zen-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-input>
    `);
  });
});
