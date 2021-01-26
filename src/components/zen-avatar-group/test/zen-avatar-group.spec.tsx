import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarGroup } from '../zen-avatar-group';

describe('zen-avatar-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup],
      html: `<zen-avatar-group></zen-avatar-group>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </zen-avatar-group>
    `);
  });
});
