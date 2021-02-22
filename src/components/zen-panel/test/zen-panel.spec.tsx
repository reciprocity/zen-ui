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
    it('should display right chevron icon if hidden', () => {
      const panel = new ZenPanel();

      expect(panel.hidden).toBe(true);
      expect(panel.icon().iconName).toEqual('chevron-right');
    });

    it('should display down chevron icon if not hidden', () => {
      const panel = new ZenPanel();

      panel.toggleHidden();

      expect(panel.hidden).toBe(false);
      expect(panel.icon().iconName).toEqual('chevron-down');
    });
  });

  describe('content', () => {
    it('should hide content on init', () => {
      const panel = new ZenPanel();
      expect(panel.hidden).toBe(true);
    });

    it('should not display content if hidden', () => {
      const panel = new ZenPanel();

      expect(panel.hidden).toBe(true);
      expect(panel.contentClasses()).toEqual({
        content: true,
        hidden: true,
      });
    });

    it('should display content if not hidden', () => {
      const panel = new ZenPanel();

      panel.toggleHidden();

      expect(panel.hidden).toBe(false);
      expect(panel.contentClasses()).toEqual({
        content: true,
        hidden: false,
      });
    });
  });
});
