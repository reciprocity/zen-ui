import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { ZenSidebarNavSkeleton } from '../zen-sidebar-nav-skeleton';

describe('zen-dropdown', () => {
  let page: SpecPage;
  let skeleton: HTMLZenSidebarNavSkeletonElement;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenSidebarNavSkeleton],
      html: `<zen-sidebar-nav-skeleton>
      </ zen-sidebar-nav-skeleton>`,
    });
    skeleton = page.root as HTMLZenSidebarNavSkeletonElement;
  });

  it('should render program selector', () => {
    const programSelector = skeleton.shadowRoot.querySelectorAll('.program-selector');
    expect(programSelector.length).toBe(1);
  });

  it('should render exact number of items', async () => {
    let items = skeleton.shadowRoot.querySelectorAll('.item');
    expect(items.length).toBe(6);

    skeleton.items = 10;
    await page.waitForChanges();

    items = skeleton.shadowRoot.querySelectorAll('.item');
    expect(items.length).toBe(10);
  });
});
