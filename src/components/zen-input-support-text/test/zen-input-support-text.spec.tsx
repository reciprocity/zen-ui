import { newSpecPage } from '@stencil/core/testing';
import { ZenInputSupportText } from '../zen-input-support-text';

describe('zen-input-support-text', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenInputSupportText],
      html: `<zen-input-support-text></zen-input-support-text>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input-support-text>
        <mock:shadow-root>
          <span class="supporting-text"></span>
        </mock:shadow-root>
      </zen-input-support-text>
    `);
  });
});
