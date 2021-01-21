import { newSpecPage } from '@stencil/core/testing';
import { ZenInputSupportText } from '../zen-input-support-text';

describe('zen-input-support-text', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenInputSupportText],
      html: `<zen-input-support-text></zen-input-support-text>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render empty', async () => {
    const page = await newSpecPage({
      components: [ZenInputSupportText],
      html: `<zen-input-support-text></zen-input-support-text>`,
    });
    expect(page.root.shadowRoot.querySelector('span')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('span').classList.contains('supporting-text')).toBe(true);
    expect(page.root.shadowRoot.querySelector('span').innerText).toBe('');
  });

  it('should render with custom text', async () => {
    const page = await newSpecPage({
      components: [ZenInputSupportText],
      html: `<zen-input-support-text text="This is the text"></zen-input-support-text>`,
    });
    expect(page.root.shadowRoot.querySelector('span')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('span').classList.contains('supporting-text')).toBe(true);
    expect(page.root.shadowRoot.querySelector('span').innerText).toBe('This is the text');
  });
});
