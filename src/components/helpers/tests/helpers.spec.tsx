import { newSpecPage } from '@stencil/core/testing';
import { ZenSpace } from '../../zen-space/zen-space';

describe('helpers', () => {
  it('should correctly parse padding shorthands', async () => {
    const page = await newSpecPage({
      components: [ZenSpace],
      html: `<zen-space p="xs sm"></zen-space>`,
    });
    const space = page.root;

    expect(space.classList.contains('px-sm')).toBe(true);
    expect(space.classList.contains('py-xs')).toBe(true);

    space.p = 'md';
    await page.waitForChanges();
    expect(space.classList.contains('p-md')).toBe(true);

    space.p = 'lg xl';
    await page.waitForChanges();
    expect(space.classList.contains('px-xl')).toBe(true);
    expect(space.classList.contains('py-lg')).toBe(true);

    space.p = 'sm lg xl';
    await page.waitForChanges();
    expect(space.classList.contains('px-lg')).toBe(true);
    expect(space.classList.contains('pt-sm')).toBe(true);
    expect(space.classList.contains('pb-xl')).toBe(true);

    space.p = 'none xs sm md';
    await page.waitForChanges();
    expect(space.classList.contains('pt-none')).toBe(true);
    expect(space.classList.contains('pr-xs')).toBe(true);
    expect(space.classList.contains('pb-sm')).toBe(true);
    expect(space.classList.contains('pl-md')).toBe(true);
  });
});
