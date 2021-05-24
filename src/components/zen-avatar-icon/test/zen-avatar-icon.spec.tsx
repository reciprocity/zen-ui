import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatarIcon } from '../zen-avatar-icon';

describe('zen-avatar-icon', () => {
  it('should hide image and show label', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon user-name="Mike Anderson"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('img')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.initials')).toBeTruthy();
  });

  it('should show image and hide label', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarIcon],
      html: `<zen-avatar-icon image-url="img.jpg"></zen-avatar-icon>`,
    });
    expect(page.root.shadowRoot.querySelector('.initials')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('img')).toBeTruthy();
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
