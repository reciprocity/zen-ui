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
});
