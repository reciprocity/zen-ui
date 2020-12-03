import { newSpecPage } from '@stencil/core/testing';
import { ZenLabel } from '../zen-label';

describe('zen-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenLabel],
      html: `<zen-label></zen-label>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-label>
        <mock:shadow-root>
          <label></label>
        </mock:shadow-root>
      </zen-label>
    `);
  });
});
