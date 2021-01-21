import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatar } from '../zen-avatar';

describe('zen-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar></zen-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar class="large" style="background: #abd2f5; color: #00528c;">
        <mock:shadow-root>
          <img class="hidden large" src="">
          <div class="label"></div>
        </mock:shadow-root>
      </zen-avatar>
    `);
  });
});
