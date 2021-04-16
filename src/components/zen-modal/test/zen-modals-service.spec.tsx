import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { modalsService } from '../zen-modals-service';

import { ZenModal } from '../zen-modal';

function resetService() {
  modalsService.modals = [];
  modalsService.lastZIndex = 100;
}

describe('zen-modal-service', () => {
  let page: SpecPage;
  let modal1;
  let modal2;

  beforeEach(async () => {
    resetService();
    page = await newSpecPage({
      components: [ZenModal],
      html: /*html*/ `
        <zen-modal id="modal1"></zen-modal>
        <zen-modal id="modal2"></zen-modal>
      `,
    });
    modal1 = page.doc.querySelector('#modal1');
    modal2 = page.doc.querySelector('#modal2');
  });

  it('should promore modal to topmost', async () => {
    modalsService.makeTopmost(modal1);
    modalsService.makeTopmost(modal2);
    expect(modalsService.modals.length).toEqual(2);
    expect(modalsService.modals[1].getAttribute('id')).toEqual('modal2');
    expect(modal2.getAttribute('topmost')).toEqual('true');
    expect(modal1.getAttribute('topmost')).toBeFalsy();
  });

  it('should increase lastZIndex', async () => {
    modalsService.makeTopmost(modal1);
    modalsService.makeTopmost(modal2);
    expect(modalsService.lastZIndex).toEqual(102);
  });

  it('should promote previous modal to topmost on close', async () => {
    modalsService.makeTopmost(modal1);
    modalsService.makeTopmost(modal2);
    expect(modal2.getAttribute('topmost')).toEqual('true');
    expect(modal1.getAttribute('topmost')).toBeFalsy();
    modalsService.modalClosed(modal2);
    expect(modal2.getAttribute('topmost')).toBeFalsy();
    expect(modal1.getAttribute('topmost')).toEqual('true');
  });
});
