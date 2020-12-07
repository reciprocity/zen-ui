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
          <textarea class="input-control" cols="30" rows="5"></textarea>
        </mock:shadow-root>
      </zen-textarea>
    `);
  });
});
