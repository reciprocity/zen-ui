import { newSpecPage, SpecPage } from '@stencil/core/testing';

import { ZenTabs } from '../zen-tabs';

describe('zen-tabs', () => {
  describe('tabs with items', () => {
    let page: SpecPage;
    let tabs: NodeListOf<Element>;

    beforeEach(async () => {
      page = await newSpecPage({
        components: [ZenTabs],
        html: `<zen-tabs />`,
      });
      page.rootInstance.tabs = [
        { label: 'Tab 1', value: '1' },
        { label: 'Tab 2', value: '2' },
      ];
      await page.waitForChanges();
      tabs = page.root.shadowRoot.querySelectorAll('.tab');
    });

    it('should render tabs', async () => {
      expect(tabs.length).toEqual(2);
    });

    it('should render selected tab', async () => {
      page.rootInstance.value = '2';
      await page.waitForChanges();
      expect(tabs[1].classList.contains('active')).toBeTruthy();
    });

    it('should select tab on click', async () => {
      expect(tabs[0].classList.contains('active')).toBeFalsy();
      tabs[0].click();
      await page.waitForChanges();
      expect(tabs[0].classList.contains('active')).toBeTruthy();
    });
  });
});
