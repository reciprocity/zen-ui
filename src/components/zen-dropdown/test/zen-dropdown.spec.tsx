import { newSpecPage } from '@stencil/core/testing';
import { ZenDropdownSimple } from '../zen-dropdown';

describe('zen-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenDropdownSimple],
      html: `<zen-dropdown></zen-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-dropdown>
      <div class="zen-multiselect">
        <div class="field" tabindex="0">
            Select something
          <div class="arrow"></div>
        </div>
        <ul></ul>
      </div>
      </zen-dropdown>
    `);
  });
});
