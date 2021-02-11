import { newSpecPage } from '@stencil/core/testing';

import { ZenTooltip } from '../zen-tooltip';

describe('zen-tooltip', () => {
  it.each(['dark', 'light', 'error'])('should correctly apply variant (variant: %s)', async variant => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip variant="${variant}" label="Testing tooltip"></zen-tooltip>`,
    });
    expect(page.root.classList.contains(variant)).toBe(true);
  });

  it.each(['top', 'right', 'bottom', 'left'])(
    'should correctly apply position (position: %s)',
    async (position: string, done: DoneFn) => {
      const page = await newSpecPage({
        components: [ZenTooltip],
        html: `<div>Trigger</div><zen-tooltip position="${position}" always-visible="true" label="Testing tooltip"></zen-tooltip>`,
      });

      // We have to wait that tooltip is displayed because of always visible param
      setTimeout(async () => {
        expect(page.root.classList.contains(position)).toBe(true);
        done();
      }, 101);
    },
  );

  it('should show tooltip on mouse over', async done => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<div>Trigger</div><zen-tooltip label="test" show-delay="0"></zen-tooltip>`,
    });

    expect(page.root).not.toHaveClass('visible');

    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
    });
    const target = page.root.previousElementSibling;
    target.dispatchEvent(mouseEvent);

    setTimeout(async () => {
      await page.waitForChanges();
      expect(page.root).toHaveClass('visible');
      done();
    }, 0);
  });
});
