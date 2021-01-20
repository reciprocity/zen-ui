import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { ZenDropdown } from '../zen-dropdown';

describe('Zen-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenDropdown],
      html: `<zen-dropdown />`,
    });
    const dropdown = page.root;
    dropdown.shadowRoot.querySelector('style').remove();
    dropdown.shadowRoot.querySelectorAll('svg').forEach(svg => svg.remove());
    expect(page.root).toEqualHtml(`
    <zen-dropdown tabindex="0">
      <mock:shadow-root>
        <div class="field">
          <div class="hidden">
            <slot name="field-private"></slot>
          </div>
          <div>
            <slot name="placeholder">
              <div class="placeholder">
                Select something
              </div>
            </slot>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="list-wrap" style="width: 100%;">
          <zen-animate>
            <div class="list">
              <slot>
              </slot>
            </div>
          </zen-animate>
        </div>
      </mock:shadow-root>
    </zen-dropdown>`);
  });
});
