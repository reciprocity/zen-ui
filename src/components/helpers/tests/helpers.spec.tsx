import { newSpecPage } from '@stencil/core/testing';
import { ZenSpace } from '../../zen-space/zen-space';

describe('helpers', () => {
  it('should correctly parse padding shorthands', async () => {
    const page = await newSpecPage({
      components: [ZenSpace],
      html: `<zen-space padding="xs sm"></zen-space>`,
    });
    const space = page.root;

    expect(space.classList.contains('pl-sm')).toBe(true);
    expect(space.classList.contains('pr-sm')).toBe(true);
    expect(space.classList.contains('pt-xs')).toBe(true);
    expect(space.classList.contains('pb-xs')).toBe(true);

    space.padding = 'md';
    await page.waitForChanges();
    expect(space.classList.contains('p-md')).toBe(true);

    space.padding = 'lg xl';
    await page.waitForChanges();
    expect(space.classList.contains('pl-xl')).toBe(true);
    expect(space.classList.contains('pr-xl')).toBe(true);
    expect(space.classList.contains('pt-lg')).toBe(true);
    expect(space.classList.contains('pb-lg')).toBe(true);

    space.padding = 'sm lg xl';
    await page.waitForChanges();
    expect(space.classList.contains('pl-lg')).toBe(true);
    expect(space.classList.contains('pr-lg')).toBe(true);
    expect(space.classList.contains('pt-sm')).toBe(true);
    expect(space.classList.contains('pb-xl')).toBe(true);

    space.padding = 'none xs sm md';
    await page.waitForChanges();
    expect(space.classList.contains('pt-none')).toBe(true);
    expect(space.classList.contains('pr-xs')).toBe(true);
    expect(space.classList.contains('pb-sm')).toBe(true);
    expect(space.classList.contains('pl-md')).toBe(true);
  });
});
