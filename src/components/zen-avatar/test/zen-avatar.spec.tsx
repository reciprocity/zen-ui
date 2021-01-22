import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatar } from '../zen-avatar';

describe('zen-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar></zen-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar class="large" style="background: #abd2f5; color: #00528c;">
        <mock:shadow-root>
          <img class="hidden large" src="">
          <div class="label"></div>
        </mock:shadow-root>
      </zen-avatar>
    `);
  });
});

describe('Test parameters rendering', () => {
  it.each(['medium', 'large'])('Test that size %s is applied correctly', async size => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar size="${size}" label="MP"></zen-avatar>`,
    });
    expect(page.root.classList.contains(size)).toBe(true);
  });

  it('Test that image is hidden and label is displayed', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar label="MP"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MP');
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(true);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(false);
  });

  it('Test that image is shown and label hidden', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar image-url="img.jpg"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('');
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(false);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(true);
  });
});
