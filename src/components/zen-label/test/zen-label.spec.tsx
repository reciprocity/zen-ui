import { newSpecPage } from '@stencil/core/testing';
import { ZenLabel } from '../zen-label';

describe('zen-label', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenLabel],
      html: `<zen-label></zen-label>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render label', async () => {
    const page = await newSpecPage({
      components: [ZenLabel],
      html: `<zen-label></zen-label>`,
    });
    expect(page.root.shadowRoot.querySelector('label')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('label').innerText).toBe('Label');
  });

  it('should render required', async () => {
    const page = await newSpecPage({
      components: [ZenLabel],
      html: `<zen-label required></zen-label>`,
    });
    expect(page.root.shadowRoot.querySelector('label')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('label').innerText).toBe('Label*');
    expect(page.root.shadowRoot.querySelector('span').classList.contains('required')).toBe(true);
  });
});
