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

  it('renders required asterisk', async () => {
    const page = await newSpecPage({
      components: [ZenText],
      html: `<zen-text required>I'm required</zen-text>`,
    });
    expect(page.root.shadowRoot.querySelector('span.required')).toBeTruthy();
  });
});
