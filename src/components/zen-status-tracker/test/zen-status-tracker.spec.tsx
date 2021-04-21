import { newSpecPage } from '@stencil/core/testing';
import { ZenStatusTracker } from '../zen-status-tracker';

describe('zen-status-tracker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenStatusTracker],
      html: `<zen-status-tracker></zen-status-tracker>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });
});
