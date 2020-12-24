import { newSpecPage } from '@stencil/core/testing';
import { ZenTooltip } from '../zen-tooltip';

describe('Test parameters rendering', () => {
  it.each(['dark', 'light', 'error'])('Test variant %s is displayed correctly', async variant => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip variant="${variant}" label="Testing tooltip"></zen-tooltip>`,
    });
    expect(page.root.getAttribute('variant')).toEqual(variant);
  });

  it.each(['top', 'right', 'bottom', 'left'])('Test each position %s is displayed correct', async position => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip position="${position}" label="Testing tooltip"></zen-tooltip>`,
    });
    expect(page.root.getAttribute('position')).toEqual(position);
  });
});

describe('Test tooltip functionality', () => {
  it('Test show tooltip on mouse over', async done => {
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
