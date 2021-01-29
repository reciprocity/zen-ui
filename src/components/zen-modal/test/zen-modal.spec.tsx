import { newSpecPage } from '@stencil/core/testing';
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

  it('emmits Cancel event', async () => {
    await testClickEvent(page, '.x-button', 'cancelClicked');
  });

  it('emmits Cancel event with default Cancel button', async () => {
    await testClickEvent(page, '.buttons-row .btn-cancel', 'cancelClicked');
  });

  it('emmits OK event with default OK button', async () => {
    await testClickEvent(page, '.buttons-row .btn-ok', 'okClicked');
  });

  it('calls makeTopmost on show', async () => {
    page.root.show = true;
    await page.waitForChanges();
    expect(modalsService.makeTopmost).toHaveBeenCalled();
  });

  it('calls modalClosed on close', async () => {
    page.root.show = true;
    await page.waitForChanges();
    page.root.show = false;
    await page.waitForChanges();
    expect(modalsService.modalClosed).toHaveBeenCalled();
  });
});
