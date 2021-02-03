import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarTooltip } from '../zen-avatar-tooltip';

describe('zen-avatar-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarTooltip],
      html: `<zen-avatar-tooltip></zen-avatar-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar-tooltip>
        <mock:shadow-root>
           <zen-avatar-icon
                background="#CED4DA"
                class="main-avatar-icon"
                color="#3E464C"
                email=""
                user-name="+0"></zen-avatar-icon>
           <zen-tooltip class="column" show-delay="0" variant="light"></zen-tooltip>
        </mock:shadow-root>
      </zen-avatar-tooltip>
    `);
  });
});
