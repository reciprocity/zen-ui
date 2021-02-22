import { newSpecPage } from '@stencil/core/testing';
import { ZenDrawer } from '../zen-drawer';

describe('zen-drawer', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenDrawer],
      html: `<zen-drawer></zen-drawer>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
