import { newSpecPage } from '@stencil/core/testing';
import { ZenSpace } from '../../zen-space/zen-space';

describe('helpers', () => {
  it('should correctly parse padding shorthands', async () => {
    const page = await newSpecPage({
      components: [ZenSpace],
      html: `<zen-space padding="xs sm"></zen-space>`,
    });
    const space = page.root;

    expect(space.classList.contains('padding-x-sm')).toBe(true);
    expect(space.classList.contains('padding-y-xs')).toBe(true);

    space.padding = 'md';
    await page.waitForChanges();
    expect(space.classList.contains('padding-md')).toBe(true);

    space.padding = 'lg xl';
    await page.waitForChanges();
    expect(space.classList.contains('padding-x-xl')).toBe(true);
    expect(space.classList.contains('padding-y-lg')).toBe(true);

    space.padding = 'sm lg xl';
    await page.waitForChanges();
    expect(space.classList.contains('padding-x-lg')).toBe(true);
    expect(space.classList.contains('padding-top-sm')).toBe(true);
    expect(space.classList.contains('padding-bottom-xl')).toBe(true);

    space.padding = 'none xs sm md';
    await page.waitForChanges();
    expect(space.classList.contains('padding-top-none')).toBe(true);
    expect(space.classList.contains('padding-right-xs')).toBe(true);
    expect(space.classList.contains('padding-bottom-sm')).toBe(true);
    expect(space.classList.contains('padding-left-md')).toBe(true);
  });
});
