import { newSpecPage } from '@stencil/core/testing';
import { ZenTooltip } from '../zen-tooltip';
import { Position, TooltipVariant } from '../../helpers/helpers';

describe('Test default rendering', () => {
  it('Variant is default dark, position is default top', async () => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip></zen-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-tooltip class="dark tooltip top" style="max-height: none;">
        <mock:shadow-root>
          <slot></slot>
          <div class="arrow dark top"></div>
        </mock:shadow-root>
      </zen-tooltip>
    `);
  });
});

describe('Test parameters rendering', () => {
  const variants = Object.keys(TooltipVariant).map(n => TooltipVariant[n]);
  it.each(variants, 'Test variant %s is displayed correctly', variant => {
    const page = newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip variant="${variant}" label="Testing tooltip"></zen-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
        <zen-tooltip>
          <mock:shadow-root>
            <div class="tooltip ${variant} top">
              <slot name="label">Testing tooltip</slot>
            </div>
          </mock:shadow-root>
        </zen-tooltip>
     `);
  });

  const positions = Object.keys(Position).map(n => Position[n]);
  it.each(positions, 'Test each position %s is displayed correct', position => {
    const page = newSpecPage({
      components: [ZenTooltip],
      html: `<zen-tooltip position="${position}" label="Testing tooltip"></zen-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
        <zen-tooltip>
          <mock:shadow-root>
            <div class="tooltip dark ${position}">
              <slot name="label">Testing tooltip</slot>
            </div>
          </mock:shadow-root>
        </zen-tooltip>
      `);
  });
});

describe('Test tooltip functionality', () => {
  it('Test show tooltip on mouse over', async () => {
    const page = await newSpecPage({
      components: [ZenTooltip],
      html: `<div>Trigger</div><zen-tooltip></zen-tooltip>`,
    });
    expect(page.root).not.toHaveClass('visible');

    const event = new Event('mouseover');
    const target = page.root.previousElementSibling as HTMLElement;

    target.dispatchEvent(event);
    await page.waitForChanges();
    expect(page.root).toHaveClass('visible');
  });
});
