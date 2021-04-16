import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { modalsService } from '../zen-modals-service';

modalsService.makeTopmost = jest.fn(() => true);
modalsService.modalClosed = jest.fn(() => true);

import { ZenModal } from '../zen-modal';

async function testClickEvent(page, clickTarget, eventName) {
  const spy = jest.fn();
  page.root.addEventListener(eventName, spy);
  page.root.shadowRoot.querySelector(clickTarget).click();
  await page.waitForChanges();
  expect(spy).toHaveBeenCalled();
}

describe('zen-modal', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenModal],
      html: /*html*/ `<zen-modal></zen-modal>`,
    });
  });

  it('should render with shadow dom', async () => {
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should emit cancel event', async () => {
    await testClickEvent(page, '.x-button', 'cancel');
  });

  it('should emit cancel event with default cancel button', async () => {
    await testClickEvent(page, 'slot[name="footer"] .btn-cancel', 'cancel');
  });

  it('should emit ok event with default ok button', async () => {
    await testClickEvent(page, 'slot[name="footer"] .btn-ok', 'ok');
  });

  it('should call makeTopmost on show', async () => {
    page.root.show = true;
    await page.waitForChanges();
    expect(modalsService.makeTopmost).toHaveBeenCalledTimes(2);
  });

  it('should call modalClosed on close', async () => {
    page.root.show = true;
    await page.waitForChanges();
    page.root.show = false;
    await page.waitForChanges();
    expect(modalsService.modalClosed).toHaveBeenCalledTimes(1);
  });
});
