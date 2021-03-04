import { newSpecPage } from '@stencil/core/testing';

import { ZenPanel } from '../zen-panel';

describe('zen-panel', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenPanel],
      html: `<zen-panel></zen-panel>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  describe('icon', () => {
    it('should display right chevron icon if not visible', () => {
      const panel = new ZenPanel();

      expect(panel.internalVisible).toBe(false);
      expect(panel.icon().iconName).toEqual('chevron-right');
    });

    it('should display down chevron icon if visible', () => {
      const panel = new ZenPanel();

      panel.toggleContent();

      expect(panel.internalVisible).toBe(true);
      expect(panel.icon().iconName).toEqual('chevron-down');
    });
  });

  describe('content', () => {
    it('should hide content on init', () => {
      const panel = new ZenPanel();
      expect(panel.internalVisible).toBe(false);
    });

    it('should not display content if not visible', () => {
      const panel = new ZenPanel();

      expect(panel.internalVisible).toBe(false);
      expect(panel.contentClasses()).toEqual({
        content: true,
        visible: false,
      });
    });

    it('should display content if visible', () => {
      const panel = new ZenPanel();

      panel.toggleContent();

      expect(panel.internalVisible).toBe(true);
      expect(panel.contentClasses()).toEqual({
        content: true,
        visible: true,
      });
    });
  });
});
