import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarIcon } from '../../zen-avatar-icon/zen-avatar-icon';

describe('zen-avatar-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon></zen-avatar-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-avatar-icon size="md" style="background: #abd2f5; color: #00528c;">
        <mock:shadow-root>
          <img class="hidden" src="">
          <div class="initials"></div>
        </mock:shadow-root>
      </zen-avatar-icon>
    `);
  });
});

describe('Test parameters rendering', () => {
  it('image is hidden and label is displayed', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(true);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(false);
  });

  it('image is shown and label hidden', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon image-url="img.jpg"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('');
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(false);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(true);
  });

  it('username initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MA');
  });

  it('username initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson Johnson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MA');
  });

  it('username with only name, initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Shelley"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('SH');
  });

  it('email initials are displayed correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon email="kelly.bush@reciprocity.com"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('KE');
  });
});
