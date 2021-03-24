import { newSpecPage } from '@stencil/core/testing';

import * as helpers from '../../helpers/animations';
helpers.showInstantly = jest.fn();
helpers.showWithAnimation = jest.fn();
helpers.hideWithAnimation = jest.fn();
helpers.hideInstantly = jest.fn();

import { ZenPanel } from '../zen-panel';

describe('zen-panel', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenPanel],
      html: `<zen-panel></zen-panel>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  describe('content', () => {
    let page: SpecPage;
    let panel: HTMLZenPanelElement;

    const render = async (attributes: string) => {
      page = await newSpecPage({
        components: [ZenPanel],
        html: /*html*/ `
        <zen-panel ${attributes} />
      `,
      });
      await page.waitForChanges();
      panel = page.root as HTMLZenPanelElement;
    };

    it('should hide content on init without animation', () => {
      const panel = new ZenPanel();
      expect(panel.visible).toBe(false);
      expect(helpers.hideInstantly).toHaveBeenCalled();
    });

    it('should not display content if not visible', () => {
      const panel = new ZenPanel();
      expect(panel.visible).toBe(false);
    });

    it('should display content if visible', () => {
      const panel = new ZenPanel();
      panel.toggleContent();
      expect(panel.visible).toBe(true);
    });

    it('should be visible from start', async () => {
      await render('visible');
      expect(panel.visible).toBe(true);
      expect(helpers.showInstantly).toHaveBeenCalled();
      expect(helpers.showWithAnimation).not.toHaveBeenCalled();
    });

    it('should hide with animation on click', async () => {
      await render('visible');
      expect(panel.visible).toBe(true);
      panel.shadowRoot.querySelector('.header').click();
      await page.waitForChanges();
      expect(helpers.hideWithAnimation).toHaveBeenCalled();
    });
  });
});
