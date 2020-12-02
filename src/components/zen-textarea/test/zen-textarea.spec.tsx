import { newSpecPage } from '@stencil/core/testing';
import { ZenTextarea } from '../zen-textarea';

describe('zen-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-textarea>
    `);
  });
});
