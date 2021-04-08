import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { ZenTabs } from '../zen-tabs';
import { ZenTab } from '../../zen-tab/zen-tab';
import { simulateMouse } from '../../helpers/jest';

describe('zen-tabs', () => {
  let page: SpecPage;
  let tabs: HTMLZenTabElement[];

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenTabs, ZenTab],
      html: `<zen-tabs value="0">
                <zen-tab>tab1</zen-tab>
                <zen-tab>tab2</zen-tab>
             </zen-tabs>`,
    });
    await page.waitForChanges();
    tabs = Array.from(page.root.children).map(n => n as HTMLZenTabElement);
  });

  it('should render tabs', async () => {
    expect(page.root.shadowRoot).toBeTruthy();
    expect(tabs.length).toEqual(2);
  });

  it('should render selected tab', async () => {
    page.rootInstance.value = '1';
    await page.waitForChanges();
    expect(tabs[1].classList.contains('selected')).toBeTruthy();
  });

  it('should select tab on click', async () => {
    expect(tabs[1].classList.contains('selected')).toBeFalsy();
    await simulateMouse('click', tabs[1]);
    await page.waitForChanges();
    expect(tabs[0].classList.contains('selected')).toBeTruthy();
  });
});
