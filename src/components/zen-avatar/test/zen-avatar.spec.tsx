import { newSpecPage } from '@stencil/core/testing';
import { ZenAvatar } from '../../zen-avatar/zen-avatar';
import { ZenAvatarIcon } from '../../zen-avatar-icon/zen-avatar-icon';
import { ZenTooltip } from '../../zen-tooltip/zen-tooltip';

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
      components: [ZenAvatar, ZenAvatarIcon, ZenTooltip],
      html: `<zen-avatar />`,
    });
    page.root.users = user;
    expect(page.root.shadowRoot.querySelector('zen-avatar-icon')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('zen-tooltip')).toBeTruthy();
  });

  it('should render single avatar icon with single avatar details tooltip', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon, ZenTooltip],
      html: `<zen-avatar />`,
    });
    page.root.users = user;
    const expectedAvatarDetails = 1;
    await page.waitForChanges();

    const tooltip = page.root.shadowRoot.querySelector('zen-tooltip');
    expect(tooltip.children.length).toEqual(expectedAvatarDetails);
  });

  it('should render single icon with multiple avatar details tooltip', async () => {
    const page = await newSpecPage({
      components: [ZenAvatar, ZenAvatarIcon, ZenTooltip],
      html: `<zen-avatar />`,
    });
    const expectedAvatarDetails = 5;
    page.root.users = users;
    await page.waitForChanges();

    const target = page.root.shadowRoot.querySelector('zen-avatar-icon');
    expect(target.shadowRoot.lastChild.textContent).toEqual('+5');

    const tooltip = page.root.shadowRoot.querySelector('zen-tooltip');
    expect(tooltip.children.length).toEqual(expectedAvatarDetails);
  });
});
