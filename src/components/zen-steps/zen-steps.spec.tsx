import { newSpecPage } from '@stencil/core/testing';
import { ZenSteps } from './zen-steps';

describe('zen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSteps],
      html: `<zen-steps></zen-steps>`,
    });
    expect(page.root.shadowRoot).toEqualHtml(`
      <div class="progressbar">
        <div class="progress" style="transform: scaleX(0);"></div>
      </div>
      <ul class="steps"></ul>`);
  });
});
