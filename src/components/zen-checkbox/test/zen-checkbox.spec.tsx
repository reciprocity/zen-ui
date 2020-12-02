import { newSpecPage } from '@stencil/core/testing';
import { ZenCheckbox } from '../zen-checkbox';

describe('zen-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });
});
