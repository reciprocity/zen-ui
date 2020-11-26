import { newSpecPage } from '@stencil/core/testing';
import { ZenSpinner } from '../zen-spinner';

describe('zen-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSpinner],
      html: `<zen-spinner></zen-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-spinner>
        <mock:shadow-root>
          <span class="spinner"></span>
        </mock:shadow-root>
      </zen-spinner>
    `);
  });
});
