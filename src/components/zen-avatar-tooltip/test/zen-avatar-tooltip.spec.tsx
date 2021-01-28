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
          <div class="row">
           <avatar-icon size="md" user-name="KA"></avatar-icon>
           <div class="column">
             <span class="tooltip-title">
               Kim Anderson
             </span>
             <p class="tooltip-code">
               kim.anderson@reciprocitylabs.com
             </p>
             <p class="tooltip-role">
               administrator
             </p>
           </div>
         </div>
        </mock:shadow-root>
      </zen-avatar-tooltip>
    `);
  });
});
