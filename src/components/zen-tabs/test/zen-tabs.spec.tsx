import { newSpecPage, SpecPage } from '@stencil/core/testing';
// import { propReflectsInAttributes } from '../../helpers/jest';

import { ZenTabs } from '../zen-tabs';

describe('Zen-Tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTabs],
      html: `<zen-tabs />`,
    });
    expect(page.root).toEqualHtml(`<zen-tabs>
      <mock:shadow-root></mock:shadow-root>
    </zen-tabs>`);
  });
});

describe('Zen-Tabs with items', () => {
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

  it('renders tabs', async () => {
    expect(tabs.length).toEqual(2);
  });

  it('renders selected tab', async () => {
    page.rootInstance.value = '2';
    await page.waitForChanges();
    expect(tabs[1].classList.contains('active')).toBeTruthy();
  });

  it('selects tab on click', async () => {
    expect(tabs[0].classList.contains('active')).toBeFalsy();
    tabs[0].click();
    await page.waitForChanges();
    expect(tabs[0].classList.contains('active')).toBeTruthy();
  });
});
