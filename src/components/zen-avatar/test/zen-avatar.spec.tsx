import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatar } from '../zen-avatar';

describe('zen-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar></zen-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar size="md" style="background: #abd2f5; color: #00528c;">
        <mock:shadow-root>
          <img class="hidden" src="">
          <div class="initials"></div>
        </mock:shadow-root>
      </zen-avatar>
    `);
  });
});

describe('Test parameters rendering', () => {
  it('image is hidden and label is displayed', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar user-name="Mike Anderson"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(true);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(false);
  });

  it('image is shown and label hidden', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar image-url="img.jpg"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('');
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(false);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(true);
  });

  it('username initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar user-name="Mike Anderson"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MA');
  });

  it('username initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar user-name="Mike Anderson Johnson"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MA');
  });

  it('username with only name, initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar user-name="Shelley"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('SH');
  });

  it('email initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar],
      html: `<zen-avatar email="kelly.bush@reciprocity.com"></zen-avatar>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('KE');
  });
});
