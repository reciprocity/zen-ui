import { newSpecPage } from '@stencil/core/testing';

import { ZenPanel } from '../zen-panel';

describe('zen-panel', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenPanel],
      html: `<zen-panel></zen-panel>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });
});
