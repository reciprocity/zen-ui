import { newSpecPage } from '@stencil/core/testing';
import { ZenText } from '../zen-text';

describe('zen-text', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenText],
      html: `<zen-text></zen-text>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('renders slot', async () => {
    const page = await newSpecPage({
      components: [ZenText],
      html: `<zen-text></zen-text>`,
    });
    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy();
  });
});
