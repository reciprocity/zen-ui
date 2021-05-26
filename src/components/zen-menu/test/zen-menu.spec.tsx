import { newSpecPage } from '@stencil/core/testing';
import { ZenMenu } from '../zen-menu';

describe('zen-menu', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenMenu],
      html: `<zen-menu></zen-menu>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
