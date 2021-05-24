import { newSpecPage } from '@stencil/core/testing';
import { ZenBadge } from '../zen-badge';

describe('zen-badge', () => {
  it('should render badge', async () => {
    const page = await newSpecPage({
      components: [ZenBadge],
      html: `<zen-badge>Content</zen-badge>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });

  it('should be invisible', async () => {
    const page = await newSpecPage({
      components: [ZenBadge],
      html: `<zen-badge value="123"></zen-badge>`,
    });

    const badge = page.root as HTMLZenBadgeElement;
    badge.value = null;
    await page.waitForChanges();

    expect(page.root.classList.contains('hidden')).toBe(true);
  });
});
