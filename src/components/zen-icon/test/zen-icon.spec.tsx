import { newSpecPage } from '@stencil/core/testing';
import { ZenIcon } from '../zen-icon';

describe('zen-icon', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon></zen-icon>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render empty box', async () => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon></zen-icon>`,
    });
    expect(page.root.innerHTML).toBe('');
  });

  it.each(['sm', 'none'])('should correctly apply padding (padding: %s)', async (padding: string) => {
    const page = await newSpecPage({
      components: [ZenIcon],
      html: `<zen-icon padding="${padding}"></zen-icon>`,
    });
    expect(page.root.classList.contains('padding-' + padding)).toBe(true);
  });
});
