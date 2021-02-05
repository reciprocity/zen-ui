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

describe('Test avatar', () => {
  it(' avatar icon and tooltip are rendered', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar />`,
    });
    page.root.users = user;
    expect(page.root.shadowRoot.querySelector('zen-avatar-icon')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('zen-tooltip')).toBeTruthy();
  });

  it('count of one rendered avatar icons is correct', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar />`,
    });
    page.root.users = user;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar-icon').length).toEqual(2);
  });

  it('count of multiple rendered avatar icons is correct', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon],
      html: `<zen-avatar />`,
    });
    page.root.users = users;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelectorAll('zen-avatar-icon').length).toEqual(6);
  });
});
