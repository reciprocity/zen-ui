import { newSpecPage, SpecPage } from '@stencil/core/testing';

jest.mock('../../helpers/animations');
import * as helpers from '../../helpers/animations';

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

    beforeEach(() => {
      jest.clearAllMocks();
    });

    const render = async (attributes?: string) => {
      page = await newSpecPage({
        components: [ZenPanel],
        html: /*html*/ `
        <zen-panel ${attributes} />
      `,
      });
      await page.waitForChanges();
      panel = page.root as HTMLZenPanelElement;
    };

    it('should hide content on init without animation', async () => {
      await render();
      expect(panel.visible).toBe(false);
      expect(helpers.hideInstantly).toHaveBeenCalled();
    });

    it('should not display content if not visible', async () => {
      await render();
      expect(panel.visible).toBe(false);
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
