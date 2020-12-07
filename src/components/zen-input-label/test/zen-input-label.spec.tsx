import { newSpecPage } from '@stencil/core/testing';
import { ZenInputLabel } from '../zen-input-label';

describe('zen-input-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenInputLabel],
      html: `<zen-input-label></zen-input-label>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input-label>
        <mock:shadow-root>
          <label></label>
        </mock:shadow-root>
      </zen-input-label>
    `);
  });
});
