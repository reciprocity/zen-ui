import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatar } from '../../zen-avatar/zen-avatar';
import { ZenAvatarIcon } from '../../zen-avatar-icon/zen-avatar-icon';

export const user = [
  {
    userName: 'Mike Anderson',
    email: 'mike.anderson@reciprocitylabs.com',
    color: '#00528C',
    background: '#D5E9FA',
  },
];

export const users = [
  {
    userName: 'Mike Anderson',
    email: 'mike.anderson@reciprocitylabs.com',
    imageUrl: '',
    color: '#00528C',
    background: '#D5E9FA',
  },
  {
    userName: 'Frank Sinatra',
    email: 'frank.sinatra@reciprocitylabs.com',
    imageUrl: '',
    color: '#643A6B',
    background: '#FADBFF',
  },
  {
    userName: 'Alex Godunov',
    email: 'alex.godunov@reciprocitylabs.com',
    imageUrl: '',
    color: '#A26900',
    background: '#FFEED2',
  },
  {
    userName: 'Jill Franklin',
    email: 'jill.franklin@reciprocitylabs.com',
    imageUrl: '',
    color: '#1B422E',
    background: '#D8F2E3',
  },
  {
    userName: 'Mark Gray',
    email: 'mark.gray@reciprocitylabs.com',
    imageUrl: '',
    color: '#00528C',
    background: '#D5E9FA',
  },
];

describe('zen-avatar', () => {
  it('should render avatar icon and tooltip', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar />`,
    });
    page.root.users = user;
    expect(page.root.shadowRoot.querySelector('zen-avatar-icon')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('zen-tooltip')).toBeTruthy();
  });

  it('should render single avatar icon', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar />`,
    });
    page.root.users = user;
    await page.waitForChanges();
    const expectedAvatarIcons = 2; // 1 + 1 since tooltip includes one avatar icon as well
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar-icon').length).toEqual(expectedAvatarIcons);
  });

  it('should render multiple avatar icons', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar />`,
    });
    page.root.users = users;
    await page.waitForChanges();
    const expectedAvatarIcons = 6; // 5 + 1 since tooltip includes one avatar icon as well
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar-icon').length).toEqual(expectedAvatarIcons);
  });
});
