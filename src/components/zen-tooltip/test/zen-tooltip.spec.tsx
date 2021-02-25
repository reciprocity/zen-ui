import { newSpecPage } from '@stencil/core/testing';

import { ZenTooltip } from '../zen-tooltip';
import { ZenPopover } from '../../zen-popover/zen-popover';

describe('zen-tooltip', () => {
  it('should correctly apply correct color to each variant', async () => {
    const page = await newSpecPage({
      components: [ZenTooltip, ZenPopover],
      html: `
        <zen-tooltip variant="dark">Some text</zen-tooltip>
      `,
    });
    const tooltip = page.doc.querySelector('zen-tooltip');
    const popover = tooltip.shadowRoot.querySelector('.popover') as HTMLZenPopoverElement;
    expect(popover.backgroundColor).toEqual('#1e272c');

    tooltip.variant = 'error';
    await page.waitForChanges();
    expect(popover.backgroundColor).toEqual('#c22f3d');

    tooltip.variant = '';
    await page.waitForChanges();
    expect(popover.backgroundColor).toEqual('');
  });

  it('should show tooltip on mouse over', async () => {
    const page = await newSpecPage({
      components: [ZenTooltip, ZenPopover],
      html: `
        <div class="trigger">Trigger</div>
        <zen-tooltip>Some text</zen-tooltip>
      `,
    });

    const target = page.doc.querySelector('.trigger');
    const tooltip = page.doc.querySelector('zen-tooltip');
    const popover = tooltip.shadowRoot.querySelector('.popover') as HTMLZenPopoverElement;

    expect(popover.visible).toBeFalsy();

    target.dispatchEvent(new MouseEvent('mouseover'));

    await page.waitForChanges();
    expect(popover.visible).toBeTruthy();
  });

  it('should assign target element to popover', async () => {
    const page = await newSpecPage({
      components: [ZenTooltip, ZenPopover],
      html: `
        <div class="trigger">Trigger</div>
        <zen-tooltip>Some text</zen-tooltip>
      `,
    });

    const target = page.doc.querySelector('.trigger');
    const tooltip = page.doc.querySelector('zen-tooltip');
    const popover = tooltip.shadowRoot.querySelector('.popover') as HTMLZenPopoverElement;

    expect(popover.targetElement).toEqual(target);
  });
});
