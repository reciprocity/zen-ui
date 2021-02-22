import { newSpecPage } from '@stencil/core/testing';
import { ZenSpace } from '../zen-space';

describe('zen-space', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenSpace],
      html: `<zen-space></zen-space>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
