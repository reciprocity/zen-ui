import { newSpecPage } from '@stencil/core/testing';

import { ZenAvatarIcon } from '../../../components/zen-avatar-icon/zen-avatar-icon';
import { ZenAvatar } from '../../../components/zen-avatar/zen-avatar';
import { ZenAvatarGroup } from '../zen-avatar-group';
import { ZenTooltip } from '../../../components/zen-tooltip/zen-tooltip';

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

describe('Test avatar group', () => {
  it(' avatar is rendered', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group  />`,
    });
    page.root.users = user;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('zen-avatar')).toBeTruthy();
  });

  it(' avatars are rendered correctly', async () => {
    const page = await newSpecPage({
      components: [ZenAvatarGroup, ZenTooltip, ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar-group display-max="3"  />`,
    });
    page.root.users = users;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar').length).toEqual(4);
    expect(
      page.root.shadowRoot.querySelectorAll('zen-avatar')[3].shadowRoot.querySelector('zen-tooltip').childElementCount,
    ).toEqual(2);
  });
});
