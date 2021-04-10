import { newSpecPage } from '@stencil/core/testing';
import { ZenTab } from '../zen-tab';

describe('zen-tab', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTab],
      html: `<zen-tab></zen-tab>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });
});
