import { newSpecPage } from '@stencil/core/testing';
import { ZenFormGroup } from '../zen-form-group';

describe('zen-form-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenFormGroup],
      html: `<zen-form-group></zen-form-group>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-form-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-form-group>
    `);
  });
});
