import { newSpecPage } from '@stencil/core/testing';
import { ZenButton } from '../zen-button';

describe('zen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button>
        <mock:shadow-root>
          <button class="btn btn-primary" type="button">
            <span class="animate-visibility">
              Button
            </span>
            <zen-spinner class="animate-visibility invisible"></zen-spinner>
          </button>
        </mock:shadow-root>
      </zen-button>
    `);
  });
});
