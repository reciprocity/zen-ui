import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarIcon } from '../zen-avatar-icon';

describe('zen-avatar-icon', () => {
  it('should render', async () => {
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

  it('should hide image and show label', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(true);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(false);
  });

  it('should show image and hide label', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon image-url="img.jpg"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('');
    expect(page.root.shadowRoot.querySelector('img').classList.contains('hidden')).toBe(false);
    expect(page.root.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(true);
  });

  it('should correctly display initials if has first and last name', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MA');
  });

  it('should correctly display initials if has first, last, and middle name', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson Johnson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('MA');
  });

  it('should correctly display initials if has only first name', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Shelley"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('SH');
  });

  it('should correctly display initials for email', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon email="kelly.bush@reciprocity.com"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('div').textContent).toEqual('KE');
  });
});
