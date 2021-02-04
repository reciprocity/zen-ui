import { newSpecPage } from '@stencil/core/testing';
import { ZenDivider } from '../zen-divider';

describe('zen-divider', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenDivider],
      html: `<zen-divider></zen-divider>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
