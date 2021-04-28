import { newSpecPage } from '@stencil/core/testing';
import { ZenDrawer } from '../zen-drawer';
import { simulateMouse } from '../../helpers/jest';

describe('zen-drawer', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenDrawer],
      html: `<zen-drawer></zen-drawer>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should open the drawer', async () => {
    const page = await newSpecPage({
      components: [ZenDrawer],
      html: `<zen-drawer></zen-drawer>`,
    });
    const drawer = page.root as HTMLZenDrawerElement;
    drawer.opened = true;
    await page.waitForChanges();
    expect(drawer.hasAttribute('opened')).toBeTruthy();
  });

  it('should close the drawer', async () => {
    const page = await newSpecPage({
      components: [ZenDrawer],
      html: `<zen-drawer opened><zen-text>Drawer</zen-text></zen-drawer>`,
    });
    const drawer = page.root as HTMLZenDrawerElement;
    drawer.opened = false;
    await page.waitForChanges();
    expect(drawer.hasAttribute('opened')).toEqual(false);

    drawer.opened = true;
    const closeBtn = drawer.shadowRoot.querySelector('.close-btn');

    simulateMouse('click', closeBtn);
    expect(drawer.hasAttribute('opened')).toEqual(false);
  });
});
