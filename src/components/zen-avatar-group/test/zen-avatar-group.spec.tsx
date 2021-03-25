import { newSpecPage } from '@stencil/core/testing';

import { ZenAvatarIcon } from '../../zen-avatar-icon/zen-avatar-icon';
import { ZenAvatar } from '../../zen-avatar/zen-avatar';
import { ZenAvatarGroup } from '../zen-avatar-group';
import { ZenTooltip } from '../../zen-tooltip/zen-tooltip';

export const user = [
  {
    userName: 'Mike Anderson',
    email: 'mike.anderson@reciprocitylabs.com',
    imageUrl: '',
  },
];

export const users = [
  {
    userName: 'Mike Anderson',
    email: 'mike.anderson@reciprocitylabs.com',
    imageUrl: '',
  },
  {
    userName: 'Frank Sinatra',
    email: 'frank.sinatra@reciprocitylabs.com',
    imageUrl: '',
  },
  {
    userName: 'Alex Godunov',
    email: 'alex.godunov@reciprocitylabs.com',
    imageUrl: '',
  },
  {
    userName: 'Jill Franklin',
    email: 'jill.franklin@reciprocitylabs.com',
    imageUrl: '',
  },
  {
    userName: 'Mark Gray',
    email: 'mark.gray@reciprocitylabs.com',
    imageUrl: '',
  },
];

export const usersColor = [
  {
    userName: 'Mike Anderson',
    email: 'mike.anderson@reciprocitylabs.com',
    imageUrl: '',
    color: '#FFFFFF',
    background: '#000000',
  },
];

describe('zen-avatar-group', () => {
  it('should render avatar', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group  />`,
    });
    page.root.users = user;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('zen-avatar')).toBeTruthy();
  });

  it('should correctly render avatars', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group max-icons="3"  />`,
    });
    page.root.users = users;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar').length).toEqual(3);
  });

  it('should show all avatars icons', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group max-icons="5"  />`,
    });
    page.root.users = users;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar').length).toEqual(5);
  });

  it('should show last two avatars in tooltip', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group max-icons="4"  />`,
    });
    page.root.users = users;
    await page.waitForChanges();
    expect(
      page.root.shadowRoot.querySelectorAll('zen-avatar')[3].shadowRoot.querySelector('zen-tooltip').childElementCount,
    ).toEqual(2);
  });

  it('should override avatar color and background', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group max-icons="1"  />`,
    });
    page.root.users = usersColor;
    await page.waitForChanges();
    const avatar = page.root.shadowRoot.querySelector('zen-avatar');

    expect(avatar.shadowRoot.querySelector('.avatar-icon').style.color).toEqual('#FFFFFF');
    expect(avatar.shadowRoot.querySelector('.avatar-icon').style.background).toEqual('#000000');
  });
});
